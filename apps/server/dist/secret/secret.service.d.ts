import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';
export declare class SecretService {
    private supabase;
    private configService;
    private readonly algorithm;
    private readonly key;
    constructor(supabase: SupabaseService, configService: ConfigService);
    private encrypt;
    private decrypt;
    setSecret(workspaceId: string, key: string, value: string, description?: string): Promise<any>;
    getSecret(workspaceId: string, key: string): Promise<string>;
    listSecrets(workspaceId: string): Promise<{
        key: any;
        description: any;
        createdAt: any;
    }[] | null>;
}
