import { TeamService } from './team.service';
import { Role } from '../types';
export declare class TeamController {
    private teamService;
    constructor(teamService: TeamService);
    createTeam(name: string, userId: string): Promise<any>;
    getMembers(teamId: string): Promise<any[]>;
    inviteMember(teamId: string, userId: string, role: Role): Promise<any>;
    removeMember(teamId: string, userId: string): Promise<any>;
}
