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
exports.GithubController = void 0;
const common_1 = require("@nestjs/common");
const github_service_1 = require("./github.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let GithubController = class GithubController {
    githubService;
    constructor(githubService) {
        this.githubService = githubService;
    }
    async callback(code, workspaceId) {
        return this.githubService.handleCallback(code, workspaceId);
    }
    async listRepos(workspaceId) {
        return this.githubService.listRepositories(workspaceId);
    }
    async getRepoDetails(workspaceId, owner, repo) {
        return this.githubService.getRepositoryDetails(workspaceId, owner, repo);
    }
    async setupWebhook(workspaceId, owner, repo) {
        return this.githubService.createWebhook(workspaceId, owner, repo);
    }
    async updateFile(workspaceId, owner, repo, path, content, message, branch) {
        return this.githubService.updateFile(workspaceId, owner, repo, path, content, message, branch);
    }
    async createPR(workspaceId, owner, repo, title, head, base, body) {
        return this.githubService.createPullRequest(workspaceId, owner, repo, title, head, base, body);
    }
};
exports.GithubController = GithubController;
__decorate([
    (0, common_1.Post)('callback'),
    __param(0, (0, common_1.Body)('code')),
    __param(1, (0, common_1.Body)('workspaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "callback", null);
__decorate([
    (0, common_1.Get)('repos'),
    __param(0, (0, common_1.Query)('workspaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "listRepos", null);
__decorate([
    (0, common_1.Get)('repos/:owner/:repo'),
    __param(0, (0, common_1.Query)('workspaceId')),
    __param(1, (0, common_1.Param)('owner')),
    __param(2, (0, common_1.Param)('repo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "getRepoDetails", null);
__decorate([
    (0, common_1.Post)('webhooks'),
    __param(0, (0, common_1.Body)('workspaceId')),
    __param(1, (0, common_1.Body)('owner')),
    __param(2, (0, common_1.Body)('repo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "setupWebhook", null);
__decorate([
    (0, common_1.Post)('files/update'),
    __param(0, (0, common_1.Body)('workspaceId')),
    __param(1, (0, common_1.Body)('owner')),
    __param(2, (0, common_1.Body)('repo')),
    __param(3, (0, common_1.Body)('path')),
    __param(4, (0, common_1.Body)('content')),
    __param(5, (0, common_1.Body)('message')),
    __param(6, (0, common_1.Body)('branch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "updateFile", null);
__decorate([
    (0, common_1.Post)('pulls'),
    __param(0, (0, common_1.Body)('workspaceId')),
    __param(1, (0, common_1.Body)('owner')),
    __param(2, (0, common_1.Body)('repo')),
    __param(3, (0, common_1.Body)('title')),
    __param(4, (0, common_1.Body)('head')),
    __param(5, (0, common_1.Body)('base')),
    __param(6, (0, common_1.Body)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "createPR", null);
exports.GithubController = GithubController = __decorate([
    (0, common_1.Controller)('github'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [github_service_1.GithubService])
], GithubController);
//# sourceMappingURL=github.controller.js.map