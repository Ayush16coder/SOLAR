"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const types_1 = require("../types");
let TeamService = class TeamService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async createTeam(name, userId) {
        const slug = name.toLowerCase().replace(/ /g, '-');
        const { data: team, error: teamError } = await this.supabase.client
            .from('Team')
            .insert({ name, slug })
            .select()
            .single();
        if (teamError || !team)
            throw new Error(teamError?.message || 'Failed to create team');
        const { error: memberError } = await this.supabase.client
            .from('TeamMember')
            .insert({
            teamId: team.id,
            userId,
            role: types_1.Role.OWNER,
        });
        if (memberError)
            throw new Error(memberError.message);
        return team;
    }
    async inviteMember(teamId, userId, role = types_1.Role.DEVELOPER) {
        const { data, error } = await this.supabase.client
            .from('TeamMember')
            .insert({
            teamId,
            userId,
            role,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async getTeamMembers(teamId) {
        const { data, error } = await this.supabase.client
            .from('TeamMember')
            .select('*, user:User(*)')
            .eq('teamId', teamId);
        if (error)
            throw new Error(error.message);
        return data;
    }
    async removeMember(teamId, userId) {
        const { data, error } = await this.supabase.client
            .from('TeamMember')
            .delete()
            .match({ teamId, userId })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], TeamService);
//# sourceMappingURL=team.service.js.map