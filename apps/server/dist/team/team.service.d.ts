import { SupabaseService } from '../supabase/supabase.service';
import { Role } from '../types';
export declare class TeamService {
    private supabase;
    constructor(supabase: SupabaseService);
    createTeam(name: string, userId: string): Promise<any>;
    inviteMember(teamId: string, userId: string, role?: Role): Promise<any>;
    getTeamMembers(teamId: string): Promise<any[]>;
    removeMember(teamId: string, userId: string): Promise<any>;
}
