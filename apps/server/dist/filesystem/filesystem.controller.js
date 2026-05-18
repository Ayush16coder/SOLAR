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
exports.FilesystemController = void 0;
const common_1 = require("@nestjs/common");
const filesystem_service_1 = require("./filesystem.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FilesystemController = class FilesystemController {
    fsService;
    constructor(fsService) {
        this.fsService = fsService;
    }
    async getTree(workspaceId, owner, repo, branch) {
        return this.fsService.getFileTree(workspaceId, owner, repo, branch);
    }
    async getFile(workspaceId, owner, repo, path, branch) {
        return this.fsService.getFileContent(workspaceId, owner, repo, path, branch);
    }
    async saveFile(workspaceId, owner, repo, path, content, message, branch) {
        return this.fsService.saveFile(workspaceId, owner, repo, path, content, message, branch);
    }
    async deleteFile(workspaceId, owner, repo, path, message, branch) {
        return this.fsService.deleteFile(workspaceId, owner, repo, path, message, branch);
    }
};
exports.FilesystemController = FilesystemController;
__decorate([
    (0, common_1.Get)('tree'),
    __param(0, (0, common_1.Query)('workspaceId')),
    __param(1, (0, common_1.Query)('owner')),
    __param(2, (0, common_1.Query)('repo')),
    __param(3, (0, common_1.Query)('branch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], FilesystemController.prototype, "getTree", null);
__decorate([
    (0, common_1.Get)('file'),
    __param(0, (0, common_1.Query)('workspaceId')),
    __param(1, (0, common_1.Query)('owner')),
    __param(2, (0, common_1.Query)('repo')),
    __param(3, (0, common_1.Query)('path')),
    __param(4, (0, common_1.Query)('branch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FilesystemController.prototype, "getFile", null);
__decorate([
    (0, common_1.Post)('file'),
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
], FilesystemController.prototype, "saveFile", null);
__decorate([
    (0, common_1.Delete)('file'),
    __param(0, (0, common_1.Body)('workspaceId')),
    __param(1, (0, common_1.Body)('owner')),
    __param(2, (0, common_1.Body)('repo')),
    __param(3, (0, common_1.Body)('path')),
    __param(4, (0, common_1.Body)('message')),
    __param(5, (0, common_1.Body)('branch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FilesystemController.prototype, "deleteFile", null);
exports.FilesystemController = FilesystemController = __decorate([
    (0, common_1.Controller)('fs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [filesystem_service_1.FilesystemService])
], FilesystemController);
//# sourceMappingURL=filesystem.controller.js.map