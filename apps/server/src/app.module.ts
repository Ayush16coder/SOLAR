import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { TeamModule } from './team/team.module';
import { GithubModule } from './github/github.module';
import { WebhooksController } from './webhooks/webhooks.controller';
import { WebhooksService } from './webhooks/webhooks.service';
import { DeploymentModule } from './deployment/deployment.module';
import { EventModule } from './event/event.module';
import { SyncModule } from './sync/sync.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { AiModule } from './ai/ai.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuditModule } from './audit/audit.module';
import { SecretModule } from './secret/secret.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    PrismaModule,
    AuthModule,
    WorkspaceModule,
    TeamModule,
    GithubModule,
    DeploymentModule,
    EventModule,
    SyncModule,
    FilesystemModule,
    AiModule,
    MonitoringModule,
    InfrastructureModule,
    AuditModule,
    SecretModule,
    MarketplaceModule,
  ],
  controllers: [AppController, WebhooksController],
  providers: [
    AppService,
    WebhooksService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
