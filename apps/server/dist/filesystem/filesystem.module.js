"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesystemModule = void 0;
const common_1 = require("@nestjs/common");
const filesystem_service_1 = require("./filesystem.service");
const filesystem_controller_1 = require("./filesystem.controller");
const github_module_1 = require("../github/github.module");
let FilesystemModule = class FilesystemModule {
};
exports.FilesystemModule = FilesystemModule;
exports.FilesystemModule = FilesystemModule = __decorate([
    (0, common_1.Module)({
        imports: [github_module_1.GithubModule],
        providers: [filesystem_service_1.FilesystemService],
        controllers: [filesystem_controller_1.FilesystemController],
    })
], FilesystemModule);
//# sourceMappingURL=filesystem.module.js.map