import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventService } from '../event/event.service';
import { AiService } from '../ai/ai.service';
import { LogEntry, LogLevel, LogSource, MetricEntry } from './types';

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name);

  constructor(
    private prisma: PrismaService,
    private eventService: EventService,
    private aiService: AiService,
  ) {}

  async ingestLog(log: Omit<LogEntry, 'id' | 'timestamp'>) {
    const entry: LogEntry = {
      ...log,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    };

    // 1. Broadcast real-time via WebSocket
    await this.eventService.publish(`project:${log.projectId}`, {
      type: 'LOG_ENTRY',
      ...entry,
    });

    // 2. If it's an error, trigger AI analysis (Task 7 integration)
    if (entry.level === LogLevel.ERROR) {
      this.analyzeErrorLog(entry);
    }

    return entry;
  }

  private async analyzeErrorLog(log: LogEntry) {
    try {
      const analysis = await this.aiService.debugDeployment(log.message);
      await this.eventService.publish(`project:${log.projectId}`, {
        type: 'AI_LOG_ANALYSIS',
        logId: log.id,
        analysis,
      });
    } catch (err) {
      this.logger.error(`AI Log Analysis failed: ${err.message}`);
    }
  }

  async getMetrics(projectId: string): Promise<MetricEntry[]> {
    // In a real app, this would query Prometheus/Grafana or a time-series DB
    // Returning mock data for the OS feel
    return Array.from({ length: 10 }).map((_, i) => ({
      timestamp: new Date(Date.now() - i * 60000),
      cpu: Math.floor(Math.random() * 40) + 10,
      memory: Math.floor(Math.random() * 500) + 200,
      responseTime: Math.floor(Math.random() * 200) + 50,
    }));
  }

  async getHealthScore(projectId: string) {
    // Logic to calculate health based on recent errors and response times
    return {
      score: 95,
      status: 'HEALTHY',
      lastDeployment: 'Success',
      uptime: '99.99%',
    };
  }
}
