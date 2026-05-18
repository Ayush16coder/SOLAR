import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProviderType } from '@prisma/client';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async createWorkspace(name: string, teamId: string) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    return this.prisma.workspace.create({
      data: {
        name,
        slug,
        teamId,
      },
    });
  }

  async getWorkspaces(teamId: string) {
    return this.prisma.workspace.findMany({
      where: { teamId },
    });
  }

  async addIntegration(workspaceId: string, provider: ProviderType, config: any) {
    return this.prisma.workspaceIntegration.upsert({
      where: {
        workspaceId_provider: {
          workspaceId,
          provider,
        },
      },
      update: { config },
      create: {
        workspaceId,
        provider,
        config,
      },
    });
  }

  async getProjects(workspaceId: string) {
    return this.prisma.project.findMany({
      where: { workspaceId },
      include: { deployments: true },
    });
  }

  async getProject(projectId: string) {
    return this.prisma.project.findUnique({
      where: { id: projectId },
      include: { workspace: true },
    });
  }
}
