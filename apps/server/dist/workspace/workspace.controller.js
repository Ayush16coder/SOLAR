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
exports.WorkspaceController = void 0;
const common_1 = require("@nestjs/common");
const workspace_service_1 = require("./workspace.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const types_1 = require("../types");
let WorkspaceController = class WorkspaceController {
    workspaceService;
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
    }
    async createWorkspace(name, teamId) {
        return this.workspaceService.createWorkspace(name, teamId);
    }
    async getWorkspaces(teamId) {
        return this.workspaceService.getWorkspaces(teamId);
    }
    async addIntegration(workspaceId, provider, config) {
        return this.workspaceService.addIntegration(workspaceId, provider, config);
    }
    async getProjects(workspaceId) {
        return this.workspaceService.getProjects(workspaceId);
    }
    async getProject(projectId) {
        return this.workspaceService.getProject(projectId);
    }
};
exports.WorkspaceController = WorkspaceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "createWorkspace", null);
__decorate([
    (0, common_1.Get)('team/:teamId'),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "getWorkspaces", null);
__decorate([
    (0, common_1.Post)(':id/integrations'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('provider')),
    __param(2, (0, common_1.Body)('config')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "addIntegration", null);
__decorate([
    (0, common_1.Get)(':id/projects'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Get)('projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "getProject", null);
exports.WorkspaceController = WorkspaceController = __decorate([
    (0, common_1.Controller)('workspaces'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [workspace_service_1.WorkspaceService])
], WorkspaceController);
//# sourceMappingURL=workspace.controller.js.map