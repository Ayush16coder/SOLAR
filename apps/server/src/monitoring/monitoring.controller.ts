import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LogLevel, LogSource } from './types';

@Controller('monitoring')
@UseGuards(JwtAuthGuard)
export class MonitoringController {
  constructor(private monitoringService: MonitoringService) {}

  @Post('logs/ingest')
  async ingestLog(
    @Body('projectId') projectId: string,
    @Body('message') message: string,
    @Body('level') level: LogLevel,
    @Body('source') source: LogSource,
    @Body('metadata') metadata?: any,
  ) {
    return this.monitoringService.ingestLog({ projectId, message, level, source, metadata });
  }

  @Get('metrics/:projectId')
  async getMetrics(@Param('projectId') projectId: string) {
    return this.monitoringService.getMetrics(projectId);
  }

  @Get('health/:projectId')
  async getHealth(@Param('projectId') projectId: string) {
    return this.monitoringService.getHealthScore(projectId);
  }
}
