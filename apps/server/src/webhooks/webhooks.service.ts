import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { DeploymentService } from '../deployment/deployment.service';
import { EventService } from '../event/event.service';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    private supabase: SupabaseService,
    private deploymentService: DeploymentService,
    private eventService: EventService,
  ) {}

  async handleGithubWebhook(payload: any, event: string) {
    this.logger.log(`Received GitHub webhook: ${event}`);

    // Find workspace associated with this repo to determine the room
    const repoUrl = payload.repository?.html_url;
    if (repoUrl) {
      const { data: project } = await this.supabase.client
        .from('Project')
        .select('*')
        .eq('repoUrl', repoUrl)
        .limit(1)
        .single();
        
      if (project) {
        await this.eventService.publish(`project:${project.id}`, {
          type: 'GITHUB_WEBHOOK',
          event,
          payload,
        });
      }
    }

    switch (event) {
      case 'push':
        await this.handlePush(payload);
        break;
      case 'pull_request':
        await this.handlePullRequest(payload);
        break;
      case 'deployment':
        await this.handleDeployment(payload);
        break;
      default:
        this.logger.warn(`Unhandled GitHub event: ${event}`);
    }
  }

  private async handlePush(payload: any) {
    const repoUrl = payload.repository.html_url;
    const branch = payload.ref.replace('refs/heads/', '');
    const commitHash = payload.after;

    this.logger.log(`Push detected on ${repoUrl} (branch: ${branch})`);

    const { data: project } = await this.supabase.client
      .from('Project')
      .select('*')
      .eq('repoUrl', repoUrl)
      .limit(1)
      .single();

    if (project) {
      this.logger.log(`Auto-deploying project: ${project.name} for branch: ${branch}`);
      try {
        await this.deploymentService.triggerDeployment(project.id, branch);
      } catch (err) {
        this.logger.error(`Auto-deployment failed for ${project.name}: ${err.message}`);
      }
    }
  }

  private async handlePullRequest(payload: any) {
    this.logger.log(`Pull request ${payload.action}: ${payload.pull_request.title}`);
  }

  private async handleDeployment(payload: any) {
    this.logger.log(`Deployment event: ${payload.deployment.environment}`);
  }
}
