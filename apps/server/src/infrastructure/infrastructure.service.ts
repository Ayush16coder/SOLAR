import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../prisma/prisma.service';
import { CloudProviderType, CloudResource, IaCConfig, ResourceStatus } from './types';

@Injectable()
export class InfrastructureService {
  private readonly logger = new Logger(InfrastructureService.name);

  constructor(
    private aiService: AiService,
    private prisma: PrismaService,
  ) {}

  async generateIaC(workspaceId: string, type: 'terraform' | 'k8s' | 'docker-compose', description: string): Promise<IaCConfig> {
    this.logger.log(`Generating ${type} config for workspace ${workspaceId}`);
    
    try {
      const content = await this.aiService.generateDevOpsConfig(
        type === 'terraform' ? 'docker' : type === 'k8s' ? 'k8s' : 'cicd', // mapping to existing ai types
        description
      );

      return {
        type,
        content: content as string,
      };
    } catch (err) {
      this.logger.error(`IaC generation failed: ${err.message}`);
      throw new BadRequestException('Failed to generate infrastructure configuration');
    }
  }

  async listResources(workspaceId: string): Promise<CloudResource[]> {
    // In a real implementation, this would fetch from the actual cloud providers via adapters
    // Mocking for Phase 3 Foundation
    return [
      {
        id: 'i-0abcd1234efgh5678',
        type: 'EC2 Instance',
        provider: CloudProviderType.AWS,
        status: ResourceStatus.ACTIVE,
        metadata: { region: 'us-east-1', instanceType: 't3.medium' },
      },
      {
        id: 'solar-cluster-01',
        type: 'EKS Cluster',
        provider: CloudProviderType.AWS,
        status: ResourceStatus.PROVISIONING,
        metadata: { version: '1.29' },
      },
      {
        id: 'global-kv-store',
        type: 'Workers KV',
        provider: CloudProviderType.CLOUDFLARE,
        status: ResourceStatus.ACTIVE,
      }
    ];
  }

  async getCostOptimization(workspaceId: string) {
    const prompt = `Analyze the current infrastructure for workspace ${workspaceId} and provide cost optimization recommendations.`;
    return this.aiService.explainInfrastructure(prompt);
  }

  async getScalingRecommendation(resourceId: string) {
    const prompt = `Provide auto-scaling recommendations for the resource ${resourceId} based on typical traffic patterns.`;
    return this.aiService.explainInfrastructure(prompt);
  }
}
