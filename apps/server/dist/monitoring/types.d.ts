export declare enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}
export declare enum LogSource {
    DEPLOYMENT = "DEPLOYMENT",
    RUNTIME = "RUNTIME",
    BUILD = "BUILD",
    SYSTEM = "SYSTEM"
}
export interface LogEntry {
    id: string;
    timestamp: Date;
    level: LogLevel;
    source: LogSource;
    message: string;
    projectId: string;
    metadata?: any;
}
export interface MetricEntry {
    timestamp: Date;
    cpu: number;
    memory: number;
    responseTime?: number;
    errorCount?: number;
}
