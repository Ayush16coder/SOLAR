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
var MonitoringService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const event_service_1 = require("../event/event.service");
const ai_service_1 = require("../ai/ai.service");
const types_1 = require("./types");
let MonitoringService = MonitoringService_1 = class MonitoringService {
    supabase;
    eventService;
    aiService;
    logger = new common_1.Logger(MonitoringService_1.name);
    constructor(supabase, eventService, aiService) {
        this.supabase = supabase;
        this.eventService = eventService;
        this.aiService = aiService;
    }
    async ingestLog(log) {
        const entry = {
            ...log,
            id: Math.random().toString(36).substring(7),
            timestamp: new Date(),
        };
        await this.eventService.publish(`project:${log.projectId}`, {
            type: 'LOG_ENTRY',
            ...entry,
        });
        if (entry.level === types_1.LogLevel.ERROR) {
            this.analyzeErrorLog(entry);
        }
        return entry;
    }
    async analyzeErrorLog(log) {
        try {
            const analysis = await this.aiService.debugDeployment(log.message);
            await this.eventService.publish(`project:${log.projectId}`, {
                type: 'AI_LOG_ANALYSIS',
                logId: log.id,
                analysis,
            });
        }
        catch (err) {
            this.logger.error(`AI Log Analysis failed: ${err.message}`);
        }
    }
    async getMetrics(projectId) {
        return Array.from({ length: 10 }).map((_, i) => ({
            timestamp: new Date(Date.now() - i * 60000),
            cpu: Math.floor(Math.random() * 40) + 10,
            memory: Math.floor(Math.random() * 500) + 200,
            responseTime: Math.floor(Math.random() * 200) + 50,
        }));
    }
    async getHealthScore(projectId) {
        return {
            score: 95,
            status: 'HEALTHY',
            lastDeployment: 'Success',
            uptime: '99.99%',
        };
    }
};
exports.MonitoringService = MonitoringService;
exports.MonitoringService = MonitoringService = MonitoringService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        event_service_1.EventService,
        ai_service_1.AiService])
], MonitoringService);
//# sourceMappingURL=monitoring.service.js.map