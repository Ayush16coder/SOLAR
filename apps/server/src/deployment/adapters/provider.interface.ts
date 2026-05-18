import { DeploymentStatus } from '@prisma/client';

export interface DeploymentOptions {
  projectId: string;
  workspaceId: string;
  commitHash?: string;
  branch?: string;
  envVars?: Record<string, string>;
  config?: any;
}

export interface DeploymentResult {
  deploymentId: string;
  url?: string;
  status: DeploymentStatus;
  logsUrl?: string;
  rawResponse?: any;
}

export interface DeploymentProvider {
  name: string;
  deploy(options: DeploymentOptions): Promise<DeploymentResult>;
  rollback(deploymentId: string): Promise<DeploymentResult>;
  getStatus(deploymentId: string): Promise<DeploymentStatus>;
  getLogs(deploymentId: string): Promise<string>;
  setEnv(projectId: string, envVars: Record<string, string>): Promise<void>;
}
