import { SupabaseService } from '../supabase/supabase.service';
import { EventService } from '../event/event.service';
import { AiService } from '../ai/ai.service';
import { LogEntry, MetricEntry } from './types';
export declare class MonitoringService {
    private supabase;
    private eventService;
    private aiService;
    private readonly logger;
    constructor(supabase: SupabaseService, eventService: EventService, aiService: AiService);
    ingestLog(log: Omit<LogEntry, 'id' | 'timestamp'>): Promise<LogEntry>;
    private analyzeErrorLog;
    getMetrics(projectId: string): Promise<MetricEntry[]>;
    getHealthScore(projectId: string): Promise<{
        score: number;
        status: string;
        lastDeployment: string;
        uptime: string;
    }>;
}
