import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { VercelAdapter } from './adapters/vercel.adapter';
import { NetlifyAdapter } from './adapters/netlify.adapter';
import { RailwayAdapter } from './adapters/railway.adapter';
import { DeploymentProvider, DeploymentOptions } from './adapters/provider.interface';
import { DeploymentStatus, ProviderType } from '../types';
import { EventService } from '../event/event.service';

@Injectable()
export class DeploymentService {
  private readonly logger = new Logger(DeploymentService.name);

  constructor(
    private supabase: SupabaseService,
    private eventService: EventService,
  ) {}

  private async getAdapter(workspaceId: string, provider: ProviderType): Promise<DeploymentProvider> {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider })
      .single();

    if (!integration || !integration.config) {
      throw new BadRequestException(`${provider} not connected for this workspace`);
    }

    const config = integration.config as any;
    const token = config.accessToken || config.apiToken;

    switch (provider) {
      case ProviderType.VERCEL:
        return new VercelAdapter(token);
      case ProviderType.NETLIFY:
        return new NetlifyAdapter(token);
      case ProviderType.RAILWAY:
        return new RailwayAdapter(token);
      default:
        throw new BadRequestException(`Unsupported provider: ${provider}`);
    }
  }

  async triggerDeployment(projectId: string, branch?: string) {
    const { data: project } = await this.supabase.client
      .from('Project')
      .select('*, workspace:Workspace(*)')
      .eq('id', projectId)
      .single();

    if (!project) throw new BadRequestException('Project not found');

    // Find the primary deployment integration for this workspace
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .eq('workspaceId', project.workspaceId)
      .in('provider', [ProviderType.VERCEL, ProviderType.NETLIFY, ProviderType.RAILWAY])
      .limit(1)
      .single();

    if (!integration) throw new BadRequestException('No deployment provider connected');

    const adapter = await this.getAdapter(project.workspaceId, integration.provider);
    
    this.logger.log(`Triggering ${integration.provider} deployment for project ${project.name}`);

    // Create record in our DB
    const { data: deploymentRecord } = await this.supabase.client
      .from('Deployment')
      .insert({
        projectId,
        status: DeploymentStatus.QUEUED,
        provider: integration.provider,
      })
      .select()
      .single();

    await this.eventService.publish(`project:${projectId}`, {
      type: 'DEPLOYMENT_STARTED',
      deploymentId: deploymentRecord.id,
      projectId,
    });

    try {
      const options: DeploymentOptions = {
        projectId: project.id,
        workspaceId: project.workspaceId,
        branch,
        config: integration.config,
      };

      const result = await adapter.deploy(options);

      // Update record with provider info
      await this.supabase.client
        .from('Deployment')
        .update({
          status: result.status,
          logsUrl: result.logsUrl,
        })
        .eq('id', deploymentRecord.id);

      await this.eventService.publish(`project:${projectId}`, {
        type: 'DEPLOYMENT_UPDATED',
        deploymentId: deploymentRecord.id,
        status: result.status,
        url: result.url,
      });

      return result;
    } catch (error) {
      this.logger.error(`Deployment failed: ${error.message}`);
      await this.supabase.client
        .from('Deployment')
        .update({ status: DeploymentStatus.FAILED })
        .eq('id', deploymentRecord.id);

      await this.eventService.publish(`project:${projectId}`, {
        type: 'DEPLOYMENT_FAILED',
        deploymentId: deploymentRecord.id,
        error: error.message,
      });

      throw error;
    }
  }

  async getDeploymentStatus(deploymentId: string) {
    const { data: deployment } = await this.supabase.client
      .from('Deployment')
      .select('*, project:Project(*)')
      .eq('id', deploymentId)
      .single();

    if (!deployment) throw new BadRequestException('Deployment not found');

    // This is a simplified logic. In a real app, you'd find which provider this deployment belongs to.
    return deployment.status;
  }
}
