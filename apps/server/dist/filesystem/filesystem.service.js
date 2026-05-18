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
exports.FilesystemService = void 0;
const common_1 = require("@nestjs/common");
const github_service_1 = require("../github/github.service");
let FilesystemService = class FilesystemService {
    githubService;
    constructor(githubService) {
        this.githubService = githubService;
    }
    async getFileTree(workspaceId, owner, repo, branch = 'main') {
        const details = await this.githubService.getRepositoryDetails(workspaceId, owner, repo);
        return this.githubService.getTree(workspaceId, owner, repo, branch);
    }
    async getFileContent(workspaceId, owner, repo, path, branch = 'main') {
        return this.githubService.getFileContent(workspaceId, owner, repo, path, branch);
    }
    async saveFile(workspaceId, owner, repo, path, content, message, branch = 'main') {
        return this.githubService.updateFile(workspaceId, owner, repo, path, content, message, branch);
    }
    async deleteFile(workspaceId, owner, repo, path, message, branch = 'main') {
        return this.githubService.deleteFile(workspaceId, owner, repo, path, message, branch);
    }
};
exports.FilesystemService = FilesystemService;
exports.FilesystemService = FilesystemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [github_service_1.GithubService])
], FilesystemService);
//# sourceMappingURL=filesystem.service.js.map