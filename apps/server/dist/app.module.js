"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const supabase_module_1 = require("./supabase/supabase.module");
const auth_module_1 = require("./auth/auth.module");
const workspace_module_1 = require("./workspace/workspace.module");
const team_module_1 = require("./team/team.module");
const github_module_1 = require("./github/github.module");
const webhooks_controller_1 = require("./webhooks/webhooks.controller");
const webhooks_service_1 = require("./webhooks/webhooks.service");
const deployment_module_1 = require("./deployment/deployment.module");
const event_module_1 = require("./event/event.module");
const sync_module_1 = require("./sync/sync.module");
const filesystem_module_1 = require("./filesystem/filesystem.module");
const ai_module_1 = require("./ai/ai.module");
const monitoring_module_1 = require("./monitoring/monitoring.module");
const infrastructure_module_1 = require("./infrastructure/infrastructure.module");
const audit_module_1 = require("./audit/audit.module");
const secret_module_1 = require("./secret/secret.module");
const marketplace_module_1 = require("./marketplace/marketplace.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
            supabase_module_1.SupabaseModule,
            auth_module_1.AuthModule,
            workspace_module_1.WorkspaceModule,
            team_module_1.TeamModule,
            github_module_1.GithubModule,
            deployment_module_1.DeploymentModule,
            event_module_1.EventModule,
            sync_module_1.SyncModule,
            filesystem_module_1.FilesystemModule,
            ai_module_1.AiModule,
            monitoring_module_1.MonitoringModule,
            infrastructure_module_1.InfrastructureModule,
            audit_module_1.AuditModule,
            secret_module_1.SecretModule,
            marketplace_module_1.MarketplaceModule,
        ],
        controllers: [app_controller_1.AppController, webhooks_controller_1.WebhooksController],
        providers: [
            app_service_1.AppService,
            webhooks_service_1.WebhooksService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map