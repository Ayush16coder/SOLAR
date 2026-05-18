import { SupabaseService } from '../supabase/supabase.service';
import { DeploymentService } from '../deployment/deployment.service';
import { EventService } from '../event/event.service';
export declare class WebhooksService {
    private supabase;
    private deploymentService;
    private eventService;
    private readonly logger;
    constructor(supabase: SupabaseService, deploymentService: DeploymentService, eventService: EventService);
    handleGithubWebhook(payload: any, event: string): Promise<void>;
    private handlePush;
    private handlePullRequest;
    private handleDeployment;
}
