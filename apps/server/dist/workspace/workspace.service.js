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
exports.WorkspaceService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let WorkspaceService = class WorkspaceService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async createWorkspace(name, teamId) {
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
        if (error)
            throw new Error(error.message);
        return data;
    }
    async getWorkspaces(teamId) {
        const { data, error } = await this.supabase.client
            .from('Workspace')
            .select('*')
            .eq('teamId', teamId);
        if (error)
            throw new Error(error.message);
        return data;
    }
    async addIntegration(workspaceId, provider, config) {
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
        }
        else {
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
    async getProjects(workspaceId) {
        const { data } = await this.supabase.client
            .from('Project')
            .select('*, deployments:Deployment(*)')
            .eq('workspaceId', workspaceId);
        return data;
    }
    async getProject(projectId) {
        const { data } = await this.supabase.client
            .from('Project')
            .select('*, workspace:Workspace(*)')
            .eq('id', projectId)
            .single();
        return data;
    }
};
exports.WorkspaceService = WorkspaceService;
exports.WorkspaceService = WorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], WorkspaceService);
//# sourceMappingURL=workspace.service.js.map