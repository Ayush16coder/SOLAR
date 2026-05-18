import { DeploymentProvider, DeploymentOptions, DeploymentResult } from './provider.interface';
import { DeploymentStatus } from '../../types';
export declare class RailwayAdapter implements DeploymentProvider {
    private readonly apiToken;
    name: string;
    constructor(apiToken: string);
    deploy(options: DeploymentOptions): Promise<DeploymentResult>;
    rollback(deploymentId: string): Promise<DeploymentResult>;
    getStatus(deploymentId: string): Promise<DeploymentStatus>;
    getLogs(deploymentId: string): Promise<string>;
    setEnv(projectId: string, envVars: Record<string, string>): Promise<void>;
}
