import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class MarketplaceService {
  constructor(private supabase: SupabaseService) {}

  async listPlugins() {
    const { data } = await this.supabase.client.from('Plugin').select('*');
    return data;
  }

  async installPlugin(workspaceId: string, pluginId: string, config: any) {
    const { data } = await this.supabase.client
      .from('PluginInstallation')
      .insert({
        workspaceId,
        pluginId,
        config,
        status: 'ENABLED',
      })
      .select()
      .single();
    return data;
  }

  async getInstalledPlugins(workspaceId: string) {
    const { data } = await this.supabase.client
      .from('PluginInstallation')
      .select('*, plugin:Plugin(*)')
      .eq('workspaceId', workspaceId);
    return data;
  }

  async updatePluginConfig(workspaceId: string, pluginId: string, config: any) {
    const { data } = await this.supabase.client
      .from('PluginInstallation')
      .update({ config })
      .match({ workspaceId, pluginId })
      .select()
      .single();
    return data;
  }
}
