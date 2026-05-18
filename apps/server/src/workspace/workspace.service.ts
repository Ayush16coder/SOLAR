import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ProviderType } from '../types';

@Injectable()
export class WorkspaceService {
  constructor(private supabase: SupabaseService) {}

  async createWorkspace(name: string, teamId: string) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    const { data, error } = await this.supabase.client
      .from('Workspace')
      .insert({
        name,
        slug,
        teamId,
      })
      .select()
      .single();
      
    if (error) throw new Error(error.message);
    return data;
  }

  async getWorkspaces(teamId: string) {
    const { data, error } = await this.supabase.client
      .from('Workspace')
      .select('*')
      .eq('teamId', teamId);
      
    if (error) throw new Error(error.message);
    return data;
  }

  async addIntegration(workspaceId: string, provider: ProviderType, config: any) {
    // Check if exists
    const { data: existing } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('id')
      .match({ workspaceId, provider })
      .single();

    if (existing) {
      const { data } = await this.supabase.client
        .from('WorkspaceIntegration')
        .update({ config })
        .eq('id', existing.id)
        .select()
        .single();
      return data;
    } else {
      const { data } = await this.supabase.client
        .from('WorkspaceIntegration')
        .insert({
          workspaceId,
          provider,
          config,
        })
        .select()
        .single();
      return data;
    }
  }

  async getProjects(workspaceId: string) {
    const { data } = await this.supabase.client
      .from('Project')
      .select('*, deployments:Deployment(*)')
      .eq('workspaceId', workspaceId);
    return data;
  }

  async getProject(projectId: string) {
    const { data } = await this.supabase.client
      .from('Project')
      .select('*, workspace:Workspace(*)')
      .eq('id', projectId)
      .single();
    return data;
  }
}
