import { SupabaseService } from '../supabase/supabase.service';
export declare class MarketplaceService {
    private supabase;
    constructor(supabase: SupabaseService);
    listPlugins(): Promise<any[] | null>;
    installPlugin(workspaceId: string, pluginId: string, config: any): Promise<any>;
    getInstalledPlugins(workspaceId: string): Promise<any[] | null>;
    updatePluginConfig(workspaceId: string, pluginId: string, config: any): Promise<any>;
}
