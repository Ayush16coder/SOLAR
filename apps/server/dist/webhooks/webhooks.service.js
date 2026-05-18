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
var WebhooksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const deployment_service_1 = require("../deployment/deployment.service");
const event_service_1 = require("../event/event.service");
let WebhooksService = WebhooksService_1 = class WebhooksService {
    supabase;
    deploymentService;
    eventService;
    logger = new common_1.Logger(WebhooksService_1.name);
    constructor(supabase, deploymentService, eventService) {
        this.supabase = supabase;
        this.deploymentService = deploymentService;
        this.eventService = eventService;
    }
    async handleGithubWebhook(payload, event) {
        this.logger.log(`Received GitHub webhook: ${event}`);
        const repoUrl = payload.repository?.html_url;
        if (repoUrl) {
            const { data: project } = await this.supabase.client
                .from('Project')
                .select('*')
                .eq('repoUrl', repoUrl)
                .limit(1)
                .single();
            if (project) {
                await this.eventService.publish(`project:${project.id}`, {
                    type: 'GITHUB_WEBHOOK',
                    event,
                    payload,
                });
            }
        }
        switch (event) {
            case 'push':
                await this.handlePush(payload);
                break;
            case 'pull_request':
                await this.handlePullRequest(payload);
                break;
            case 'deployment':
                await this.handleDeployment(payload);
                break;
            default:
                this.logger.warn(`Unhandled GitHub event: ${event}`);
        }
    }
    async handlePush(payload) {
        const repoUrl = payload.repository.html_url;
        const branch = payload.ref.replace('refs/heads/', '');
        const commitHash = payload.after;
        this.logger.log(`Push detected on ${repoUrl} (branch: ${branch})`);
        const { data: project } = await this.supabase.client
            .from('Project')
            .select('*')
            .eq('repoUrl', repoUrl)
            .limit(1)
            .single();
        if (project) {
            this.logger.log(`Auto-deploying project: ${project.name} for branch: ${branch}`);
            try {
                await this.deploymentService.triggerDeployment(project.id, branch);
            }
            catch (err) {
                this.logger.error(`Auto-deployment failed for ${project.name}: ${err.message}`);
            }
        }
    }
    async handlePullRequest(payload) {
        this.logger.log(`Pull request ${payload.action}: ${payload.pull_request.title}`);
    }
    async handleDeployment(payload) {
        this.logger.log(`Deployment event: ${payload.deployment.environment}`);
    }
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = WebhooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        deployment_service_1.DeploymentService,
        event_service_1.EventService])
], WebhooksService);
//# sourceMappingURL=webhooks.service.js.map