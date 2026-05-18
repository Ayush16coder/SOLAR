import { DeploymentProvider, DeploymentOptions, DeploymentResult } from './provider.interface';
import { DeploymentStatus } from '../../types';

export class RailwayAdapter implements DeploymentProvider {
  name = 'RAILWAY';

  constructor(private readonly apiToken: string) {}

  async deploy(options: DeploymentOptions): Promise<DeploymentResult> {
    // Railway GraphQL API call
    return {
      deploymentId: 'railway-dep-id',
      status: DeploymentStatus.QUEUED,
    };
  }

  async rollback(deploymentId: string): Promise<DeploymentResult> {
    throw new Error('Not implemented');
  }

  async getStatus(deploymentId: string): Promise<DeploymentStatus> {
    return DeploymentStatus.SUCCESS;
  }

  async getLogs(deploymentId: string): Promise<string> {
    return 'Railway logs';
  }

  async setEnv(projectId: string, envVars: Record<string, string>): Promise<void> {
    // Railway env
  }
}
