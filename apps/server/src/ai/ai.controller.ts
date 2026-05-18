import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { AiService, AIModelProvider } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('chat')
  async chat(
    @Body('messages') messages: { role: string; content: string }[],
    @Body('provider') provider?: AIModelProvider,
  ) {
    return this.aiService.chat(messages, provider);
  }

  @Post('debug')
  async debug(@Body('logs') logs: string, @Body('provider') provider?: AIModelProvider) {
    return this.aiService.debugDeployment(logs, provider);
  }

  @Post('generate')
  async generate(
    @Body('type') type: 'docker' | 'k8s' | 'cicd',
    @Body('description') description: string,
    @Body('provider') provider?: AIModelProvider,
  ) {
    return this.aiService.generateDevOpsConfig(type, description, provider);
  }

  @Get('assistant')
  async assistant(@Query('q') query: string, @Query('provider') provider?: AIModelProvider) {
    return this.aiService.explainInfrastructure(query, provider);
  }
}
