import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Subject } from 'rxjs';

@Injectable()
export class EventService implements OnModuleInit, OnModuleDestroy {
  private publisher: Redis;
  private subscriber: Redis;
  private eventSubject = new Subject<{ channel: string; message: any }>();

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const redisUrl = this.configService.get('REDIS_URL');
    if (!redisUrl) {
      console.warn('REDIS_URL is not set. Events will not be published to Redis (Safe for Serverless).');
      return;
    }
    
    try {
      this.publisher = new Redis(redisUrl, { maxRetriesPerRequest: 1, retryStrategy: () => null });
      this.subscriber = new Redis(redisUrl, { maxRetriesPerRequest: 1, retryStrategy: () => null });

      this.subscriber.on('message', (channel, message) => {
        this.eventSubject.next({ channel, message: JSON.parse(message) });
      });
      
      this.subscriber.on('error', (err) => console.error('Redis Subscriber Error', err));
      this.publisher.on('error', (err) => console.error('Redis Publisher Error', err));
    } catch (e) {
      console.error('Failed to initialize Redis', e);
    }
  }

  async publish(channel: string, message: any) {
    if (this.publisher) {
      await this.publisher.publish(channel, JSON.stringify(message));
    }
  }

  async subscribe(channel: string) {
    if (this.subscriber) {
      await this.subscriber.subscribe(channel);
    }
  }

  getEvents() {
    return this.eventSubject.asObservable();
  }

  onModuleDestroy() {
    if (this.publisher) this.publisher.disconnect();
    if (this.subscriber) this.subscriber.disconnect();
  }
}
