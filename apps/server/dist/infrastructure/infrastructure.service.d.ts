import { AiService } from '../ai/ai.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CloudResource, IaCConfig } from './types';
export declare class InfrastructureService {
    private aiService;
    private supabase;
    private readonly logger;
    constructor(aiService: AiService, supabase: SupabaseService);
    generateIaC(workspaceId: string, type: 'terraform' | 'k8s' | 'docker-compose', description: string): Promise<IaCConfig>;
    listResources(workspaceId: string): Promise<CloudResource[]>;
    getCostOptimization(workspaceId: string): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
    getScalingRecommendation(resourceId: string): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
}
