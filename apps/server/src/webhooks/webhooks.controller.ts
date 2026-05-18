import { Controller, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private webhooksService: WebhooksService,
    private configService: ConfigService,
  ) {}

  @Post('github')
  async handleGithub(
    @Body() payload: any,
    @Headers('x-github-event') event: string,
    @Headers('x-hub-signature-256') signature: string,
  ) {
    const secret = this.configService.get('GITHUB_WEBHOOK_SECRET');
    
    if (secret && !this.verifySignature(payload, signature, secret)) {
      throw new BadRequestException('Invalid signature');
    }

    await this.webhooksService.handleGithubWebhook(payload, event);
    return { received: true };
  }

  private verifySignature(payload: any, signature: string, secret: string): boolean {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(JSON.stringify(payload)).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  }
}
