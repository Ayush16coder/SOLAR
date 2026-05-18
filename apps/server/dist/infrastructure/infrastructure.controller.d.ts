import { InfrastructureService } from './infrastructure.service';
export declare class InfrastructureController {
    private infraService;
    constructor(infraService: InfrastructureService);
    generateIaC(workspaceId: string, type: 'terraform' | 'k8s' | 'docker-compose', description: string): Promise<import("./types").IaCConfig>;
    listResources(workspaceId: string): Promise<import("./types").CloudResource[]>;
    getCostOptimization(workspaceId: string): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
    getScalingRecommendation(resourceId: string): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
}
