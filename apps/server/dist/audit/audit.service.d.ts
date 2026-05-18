import { SupabaseService } from '../supabase/supabase.service';
export declare class AuditService {
    private supabase;
    constructor(supabase: SupabaseService);
    log(data: {
        workspaceId: string;
        userId: string;
        action: string;
        resource: string;
        resourceId: string;
        metadata?: any;
    }): Promise<any>;
    getLogs(workspaceId: string): Promise<any[] | null>;
}
