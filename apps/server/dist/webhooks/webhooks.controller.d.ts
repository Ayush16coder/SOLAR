import { WebhooksService } from './webhooks.service';
import { ConfigService } from '@nestjs/config';
export declare class WebhooksController {
    private webhooksService;
    private configService;
    constructor(webhooksService: WebhooksService, configService: ConfigService);
    handleGithub(payload: any, event: string, signature: string): Promise<{
        received: boolean;
    }>;
    private verifySignature;
}
