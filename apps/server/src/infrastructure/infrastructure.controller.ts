import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { InfrastructureService } from './infrastructure.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('infrastructure')
@UseGuards(JwtAuthGuard)
export class InfrastructureController {
  constructor(private infraService: InfrastructureService) {}

  @Post('generate')
  async generateIaC(
    @Body('workspaceId') workspaceId: string,
    @Body('type') type: 'terraform' | 'k8s' | 'docker-compose',
    @Body('description') description: string,
  ) {
    return this.infraService.generateIaC(workspaceId, type, description);
  }

  @Get('resources')
  async listResources(@Query('workspaceId') workspaceId: string) {
    return this.infraService.listResources(workspaceId);
  }

  @Get('recommendations/cost')
  async getCostOptimization(@Query('workspaceId') workspaceId: string) {
    return this.infraService.getCostOptimization(workspaceId);
  }

  @Get('recommendations/scaling/:id')
  async getScalingRecommendation(@Param('id') resourceId: string) {
    return this.infraService.getScalingRecommendation(resourceId);
  }
}
