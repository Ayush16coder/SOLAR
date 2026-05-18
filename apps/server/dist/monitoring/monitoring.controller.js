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
exports.MonitoringController = void 0;
const common_1 = require("@nestjs/common");
const monitoring_service_1 = require("./monitoring.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const types_1 = require("./types");
let MonitoringController = class MonitoringController {
    monitoringService;
    constructor(monitoringService) {
        this.monitoringService = monitoringService;
    }
    async ingestLog(projectId, message, level, source, metadata) {
        return this.monitoringService.ingestLog({ projectId, message, level, source, metadata });
    }
    async getMetrics(projectId) {
        return this.monitoringService.getMetrics(projectId);
    }
    async getHealth(projectId) {
        return this.monitoringService.getHealthScore(projectId);
    }
};
exports.MonitoringController = MonitoringController;
__decorate([
    (0, common_1.Post)('logs/ingest'),
    __param(0, (0, common_1.Body)('projectId')),
    __param(1, (0, common_1.Body)('message')),
    __param(2, (0, common_1.Body)('level')),
    __param(3, (0, common_1.Body)('source')),
    __param(4, (0, common_1.Body)('metadata')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "ingestLog", null);
__decorate([
    (0, common_1.Get)('metrics/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('health/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "getHealth", null);
exports.MonitoringController = MonitoringController = __decorate([
    (0, common_1.Controller)('monitoring'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [monitoring_service_1.MonitoringService])
], MonitoringController);
//# sourceMappingURL=monitoring.controller.js.map