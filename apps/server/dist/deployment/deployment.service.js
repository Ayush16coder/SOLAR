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
var DeploymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const vercel_adapter_1 = require("./adapters/vercel.adapter");
const netlify_adapter_1 = require("./adapters/netlify.adapter");
const railway_adapter_1 = require("./adapters/railway.adapter");
const types_1 = require("../types");
const event_service_1 = require("../event/event.service");
let DeploymentService = DeploymentService_1 = class DeploymentService {
    supabase;
    eventService;
    logger = new common_1.Logger(DeploymentService_1.name);
    constructor(supabase, eventService) {
        this.supabase = supabase;
        this.eventService = eventService;
    }
    async getAdapter(workspaceId, provider) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException(`${provider} not connected for this workspace`);
        }
        const config = integration.config;
        const token = config.accessToken || config.apiToken;
        switch (provider) {
            case types_1.ProviderType.VERCEL:
                return new vercel_adapter_1.VercelAdapter(token);
            case types_1.ProviderType.NETLIFY:
                return new netlify_adapter_1.NetlifyAdapter(token);
            case types_1.ProviderType.RAILWAY:
                return new railway_adapter_1.RailwayAdapter(token);
            default:
                throw new common_1.BadRequestException(`Unsupported provider: ${provider}`);
        }
    }
    async triggerDeployment(projectId, branch) {
        const { data: project } = await this.supabase.client
            .from('Project')
            .select('*, workspace:Workspace(*)')
            .eq('id', projectId)
            .single();
        if (!project)
            throw new common_1.BadRequestException('Project not found');
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .eq('workspaceId', project.workspaceId)
            .in('provider', [types_1.ProviderType.VERCEL, types_1.ProviderType.NETLIFY, types_1.ProviderType.RAILWAY])
            .limit(1)
            .single();
        if (!integration)
            throw new common_1.BadRequestException('No deployment provider connected');
        const adapter = await this.getAdapter(project.workspaceId, integration.provider);
        this.logger.log(`Triggering ${integration.provider} deployment for project ${project.name}`);
        const { data: deploymentRecord } = await this.supabase.client
            .from('Deployment')
            .insert({
            projectId,
            status: types_1.DeploymentStatus.QUEUED,
            provider: integration.provider,
        })
            .select()
            .single();
        await this.eventService.publish(`project:${projectId}`, {
            type: 'DEPLOYMENT_STARTED',
            deploymentId: deploymentRecord.id,
            projectId,
        });
        try {
            const options = {
                projectId: project.id,
                workspaceId: project.workspaceId,
                branch,
                config: integration.config,
            };
            const result = await adapter.deploy(options);
            await this.supabase.client
                .from('Deployment')
                .update({
                status: result.status,
                logsUrl: result.logsUrl,
            })
                .eq('id', deploymentRecord.id);
            await this.eventService.publish(`project:${projectId}`, {
                type: 'DEPLOYMENT_UPDATED',
                deploymentId: deploymentRecord.id,
                status: result.status,
                url: result.url,
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Deployment failed: ${error.message}`);
            await this.supabase.client
                .from('Deployment')
                .update({ status: types_1.DeploymentStatus.FAILED })
                .eq('id', deploymentRecord.id);
            await this.eventService.publish(`project:${projectId}`, {
                type: 'DEPLOYMENT_FAILED',
                deploymentId: deploymentRecord.id,
                error: error.message,
            });
            throw error;
        }
    }
    async getDeploymentStatus(deploymentId) {
        const { data: deployment } = await this.supabase.client
            .from('Deployment')
            .select('*, project:Project(*)')
            .eq('id', deploymentId)
            .single();
        if (!deployment)
            throw new common_1.BadRequestException('Deployment not found');
        return deployment.status;
    }
};
exports.DeploymentService = DeploymentService;
exports.DeploymentService = DeploymentService = DeploymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        event_service_1.EventService])
], DeploymentService);
//# sourceMappingURL=deployment.service.js.map