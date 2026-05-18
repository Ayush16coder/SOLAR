import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Role } from '../types';

@Injectable()
export class TeamService {
  constructor(private supabase: SupabaseService) {}

  async createTeam(name: string, userId: string) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    
    // In Supabase, we need to do this in two steps or use an RPC.
    // 1. Create team
    const { data: team, error: teamError } = await this.supabase.client
      .from('Team')
      .insert({ name, slug })
      .select()
      .single();
      
    if (teamError || !team) throw new Error(teamError?.message || 'Failed to create team');

    // 2. Create team member
    const { error: memberError } = await this.supabase.client
      .from('TeamMember')
      .insert({
        teamId: team.id,
        userId,
        role: Role.OWNER,
      });

    if (memberError) throw new Error(memberError.message);

    return team;
  }

  async inviteMember(teamId: string, userId: string, role: Role = Role.DEVELOPER) {
    const { data, error } = await this.supabase.client
      .from('TeamMember')
      .insert({
        teamId,
        userId,
        role,
      })
      .select()
      .single();
      
    if (error) throw new Error(error.message);
    return data;
  }

  async getTeamMembers(teamId: string) {
    const { data, error } = await this.supabase.client
      .from('TeamMember')
      .select('*, user:User(*)')
      .eq('teamId', teamId);
      
    if (error) throw new Error(error.message);
    return data;
  }

  async removeMember(teamId: string, userId: string) {
    const { data, error } = await this.supabase.client
      .from('TeamMember')
      .delete()
      .match({ teamId, userId })
      .select()
      .single();
      
    if (error) throw new Error(error.message);
    return data;
  }
}
