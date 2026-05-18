import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class EventService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private publisher;
    private subscriber;
    private eventSubject;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    publish(channel: string, message: any): Promise<void>;
    subscribe(channel: string): Promise<void>;
    getEvents(): import("rxjs").Observable<{
        channel: string;
        message: any;
    }>;
    onModuleDestroy(): void;
}
