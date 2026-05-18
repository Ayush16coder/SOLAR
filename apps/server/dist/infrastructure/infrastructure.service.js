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
var InfrastructureService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureService = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
const supabase_service_1 = require("../supabase/supabase.service");
const types_1 = require("./types");
let InfrastructureService = InfrastructureService_1 = class InfrastructureService {
    aiService;
    supabase;
    logger = new common_1.Logger(InfrastructureService_1.name);
    constructor(aiService, supabase) {
        this.aiService = aiService;
        this.supabase = supabase;
    }
    async generateIaC(workspaceId, type, description) {
        this.logger.log(`Generating ${type} config for workspace ${workspaceId}`);
        try {
            const content = await this.aiService.generateDevOpsConfig(type === 'terraform' ? 'docker' : type === 'k8s' ? 'k8s' : 'cicd', description);
            return {
                type,
                content: content,
            };
        }
        catch (err) {
            this.logger.error(`IaC generation failed: ${err.message}`);
            throw new common_1.BadRequestException('Failed to generate infrastructure configuration');
        }
    }
    async listResources(workspaceId) {
        return [
            {
                id: 'i-0abcd1234efgh5678',
                type: 'EC2 Instance',
                provider: types_1.CloudProviderType.AWS,
                status: types_1.ResourceStatus.ACTIVE,
                metadata: { region: 'us-east-1', instanceType: 't3.medium' },
            },
            {
                id: 'solar-cluster-01',
                type: 'EKS Cluster',
                provider: types_1.CloudProviderType.AWS,
                status: types_1.ResourceStatus.PROVISIONING,
                metadata: { version: '1.29' },
            },
            {
                id: 'global-kv-store',
                type: 'Workers KV',
                provider: types_1.CloudProviderType.CLOUDFLARE,
                status: types_1.ResourceStatus.ACTIVE,
            }
        ];
    }
    async getCostOptimization(workspaceId) {
        const prompt = `Analyze the current infrastructure for workspace ${workspaceId} and provide cost optimization recommendations.`;
        return this.aiService.explainInfrastructure(prompt);
    }
    async getScalingRecommendation(resourceId) {
        const prompt = `Provide auto-scaling recommendations for the resource ${resourceId} based on typical traffic patterns.`;
        return this.aiService.explainInfrastructure(prompt);
    }
};
exports.InfrastructureService = InfrastructureService;
exports.InfrastructureService = InfrastructureService = InfrastructureService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ai_service_1.AiService,
        supabase_service_1.SupabaseService])
], InfrastructureService);
//# sourceMappingURL=infrastructure.service.js.map