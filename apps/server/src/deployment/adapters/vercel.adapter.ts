import { DeploymentProvider, DeploymentOptions, DeploymentResult } from './provider.interface';
import { DeploymentStatus } from '../../types';
import axios from 'axios';

export class VercelAdapter implements DeploymentProvider {
  name = 'VERCEL';
  private readonly baseUrl = 'https://api.vercel.com';

  constructor(private readonly apiToken: string) {}

  async deploy(options: DeploymentOptions): Promise<DeploymentResult> {
    const { data } = await axios.post(
      `${this.baseUrl}/v13/deployments`,
      {
        name: options.projectId,
        gitSource: {
          type: 'github',
          repoId: options.config.repoId,
          ref: options.branch || 'main',
        },
      },
      {
        headers: { Authorization: `Bearer ${this.apiToken}` },
      }
    );

    return {
      deploymentId: data.id,
      url: data.url,
      status: this.mapStatus(data.status),
      rawResponse: data,
    };
  }

  async rollback(deploymentId: string): Promise<DeploymentResult> {
    // Vercel rollback is usually just redeploying a previous deployment
    throw new Error('Rollback not implemented for Vercel adapter yet');
  }

  async getStatus(deploymentId: string): Promise<DeploymentStatus> {
    const { data } = await axios.get(`${this.baseUrl}/v13/deployments/${deploymentId}`, {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    });
    return this.mapStatus(data.status);
  }

  async getLogs(deploymentId: string): Promise<string> {
    // Vercel logs are typically fetched via a separate events endpoint
    return 'Fetching logs...';
  }

  async setEnv(projectId: string, envVars: Record<string, string>): Promise<void> {
    for (const [key, value] of Object.entries(envVars)) {
      await axios.post(
        `${this.baseUrl}/v9/projects/${projectId}/env`,
        { key, value, type: 'plain', target: ['production', 'preview', 'development'] },
        { headers: { Authorization: `Bearer ${this.apiToken}` } }
      );
    }
  }

  private mapStatus(vercelStatus: string): DeploymentStatus {
    switch (vercelStatus) {
      case 'READY': return DeploymentStatus.SUCCESS;
      case 'BUILDING': return DeploymentStatus.BUILDING;
      case 'ERROR': return DeploymentStatus.FAILED;
      case 'CANCELED': return DeploymentStatus.CANCELLED;
      default: return DeploymentStatus.QUEUED;
    }
  }
}
