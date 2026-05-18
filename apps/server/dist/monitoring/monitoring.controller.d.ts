import { MonitoringService } from './monitoring.service';
import { LogLevel, LogSource } from './types';
export declare class MonitoringController {
    private monitoringService;
    constructor(monitoringService: MonitoringService);
    ingestLog(projectId: string, message: string, level: LogLevel, source: LogSource, metadata?: any): Promise<import("./types").LogEntry>;
    getMetrics(projectId: string): Promise<import("./types").MetricEntry[]>;
    getHealth(projectId: string): Promise<{
        score: number;
        status: string;
        lastDeployment: string;
        uptime: string;
    }>;
}
