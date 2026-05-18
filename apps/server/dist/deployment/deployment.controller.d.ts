import { DeploymentService } from './deployment.service';
export declare class DeploymentController {
    private deploymentService;
    constructor(deploymentService: DeploymentService);
    deploy(projectId: string, branch?: string): Promise<import("./adapters/provider.interface").DeploymentResult>;
    getStatus(deploymentId: string): Promise<{
        status: any;
    }>;
}
