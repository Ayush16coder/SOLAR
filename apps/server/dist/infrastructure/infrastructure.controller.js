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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureController = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_service_1 = require("./infrastructure.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let InfrastructureController = class InfrastructureController {
    infraService;
    constructor(infraService) {
        this.infraService = infraService;
    }
    async generateIaC(workspaceId, type, description) {
        return this.infraService.generateIaC(workspaceId, type, description);
    }
    async listResources(workspaceId) {
        return this.infraService.listResources(workspaceId);
    }
    async getCostOptimization(workspaceId) {
        return this.infraService.getCostOptimization(workspaceId);
    }
    async getScalingRecommendation(resourceId) {
        return this.infraService.getScalingRecommendation(resourceId);
    }
};
exports.InfrastructureController = InfrastructureController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)('workspaceId')),
    __param(1, (0, common_1.Body)('type')),
    __param(2, (0, common_1.Body)('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InfrastructureController.prototype, "generateIaC", null);
__decorate([
    (0, common_1.Get)('resources'),
    __param(0, (0, common_1.Query)('workspaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InfrastructureController.prototype, "listResources", null);
__decorate([
    (0, common_1.Get)('recommendations/cost'),
    __param(0, (0, common_1.Query)('workspaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InfrastructureController.prototype, "getCostOptimization", null);
__decorate([
    (0, common_1.Get)('recommendations/scaling/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InfrastructureController.prototype, "getScalingRecommendation", null);
exports.InfrastructureController = InfrastructureController = __decorate([
    (0, common_1.Controller)('infrastructure'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [infrastructure_service_1.InfrastructureService])
], InfrastructureController);
//# sourceMappingURL=infrastructure.controller.js.map