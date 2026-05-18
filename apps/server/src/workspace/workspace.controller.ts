import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProviderType } from '../types';

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post()
  async createWorkspace(@Body('name') name: string, @Body('teamId') teamId: string) {
    return this.workspaceService.createWorkspace(name, teamId);
  }

  @Get('team/:teamId')
  async getWorkspaces(@Param('teamId') teamId: string) {
    return this.workspaceService.getWorkspaces(teamId);
  }

  @Post(':id/integrations')
  async addIntegration(
    @Param('id') workspaceId: string,
    @Body('provider') provider: ProviderType,
    @Body('config') config: any,
  ) {
    return this.workspaceService.addIntegration(workspaceId, provider, config);
  }

  @Get(':id/projects')
  async getProjects(@Param('id') workspaceId: string) {
    return this.workspaceService.getProjects(workspaceId);
  }

  @Get('projects/:id')
  async getProject(@Param('id') projectId: string) {
    return this.workspaceService.getProject(projectId);
  }
}
