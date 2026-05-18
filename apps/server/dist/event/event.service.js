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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
const rxjs_1 = require("rxjs");
let EventService = class EventService {
    configService;
    publisher;
    subscriber;
    eventSubject = new rxjs_1.Subject();
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        const redisUrl = this.configService.get('REDIS_URL');
        if (!redisUrl) {
            console.warn('REDIS_URL is not set. Events will not be published to Redis (Safe for Serverless).');
            return;
        }
        try {
            this.publisher = new ioredis_1.default(redisUrl, { maxRetriesPerRequest: 1, retryStrategy: () => null });
            this.subscriber = new ioredis_1.default(redisUrl, { maxRetriesPerRequest: 1, retryStrategy: () => null });
            this.subscriber.on('message', (channel, message) => {
                this.eventSubject.next({ channel, message: JSON.parse(message) });
            });
            this.subscriber.on('error', (err) => console.error('Redis Subscriber Error', err));
            this.publisher.on('error', (err) => console.error('Redis Publisher Error', err));
        }
        catch (e) {
            console.error('Failed to initialize Redis', e);
        }
    }
    async publish(channel, message) {
        if (this.publisher) {
            await this.publisher.publish(channel, JSON.stringify(message));
        }
    }
    async subscribe(channel) {
        if (this.subscriber) {
            await this.subscriber.subscribe(channel);
        }
    }
    getEvents() {
        return this.eventSubject.asObservable();
    }
    onModuleDestroy() {
        if (this.publisher)
            this.publisher.disconnect();
        if (this.subscriber)
            this.subscriber.disconnect();
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EventService);
//# sourceMappingURL=event.service.js.map