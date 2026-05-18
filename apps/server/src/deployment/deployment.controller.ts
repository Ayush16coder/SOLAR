import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { DeploymentService } from './deployment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('deployments')
@UseGuards(JwtAuthGuard)
export class DeploymentController {
  constructor(private deploymentService: DeploymentService) {}

  @Post('project/:projectId')
  async deploy(@Param('projectId') projectId: string, @Body('branch') branch?: string) {
    return this.deploymentService.triggerDeployment(projectId, branch);
  }

  @Get(':id/status')
  async getStatus(@Param('id') deploymentId: string) {
    const status = await this.deploymentService.getDeploymentStatus(deploymentId);
    return { status };
  }
}
