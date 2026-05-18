import { SupabaseService } from '../supabase/supabase.service';
import { EventService } from '../event/event.service';
export declare class DeploymentService {
    private supabase;
    private eventService;
    private readonly logger;
    constructor(supabase: SupabaseService, eventService: EventService);
    private getAdapter;
    triggerDeployment(projectId: string, branch?: string): Promise<import("./adapters/provider.interface").DeploymentResult>;
    getDeploymentStatus(deploymentId: string): Promise<any>;
}
