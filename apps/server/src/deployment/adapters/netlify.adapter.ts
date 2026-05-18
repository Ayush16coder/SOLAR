import { DeploymentProvider, DeploymentOptions, DeploymentResult } from './provider.interface';
import { DeploymentStatus } from '@prisma/client';
import axios from 'axios';

export class NetlifyAdapter implements DeploymentProvider {
  name = 'NETLIFY';
  private readonly baseUrl = 'https://api.netlify.com/api/v1';

  constructor(private readonly apiToken: string) {}

  async deploy(options: DeploymentOptions): Promise<DeploymentResult> {
    const siteId = options.config.siteId;
    const { data } = await axios.post(
      `${this.baseUrl}/sites/${siteId}/builds`,
      {},
      { headers: { Authorization: `Bearer ${this.apiToken}` } }
    );

    return {
      deploymentId: data.id,
      status: DeploymentStatus.QUEUED,
      rawResponse: data,
    };
  }

  async rollback(deploymentId: string): Promise<DeploymentResult> {
    throw new Error('Rollback not implemented for Netlify');
  }

  async getStatus(deploymentId: string): Promise<DeploymentStatus> {
    // Netlify status check
    return DeploymentStatus.SUCCESS; 
  }

  async getLogs(deploymentId: string): Promise<string> {
    return 'Netlify logs';
  }

  async setEnv(projectId: string, envVars: Record<string, string>): Promise<void> {
    // Netlify env set
  }
}
