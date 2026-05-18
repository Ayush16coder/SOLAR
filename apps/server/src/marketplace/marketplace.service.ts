import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketplaceService {
  constructor(private prisma: PrismaService) {}

  async listPlugins() {
    return this.prisma.plugin.findMany();
  }

  async installPlugin(workspaceId: string, pluginId: string, config: any) {
    return this.prisma.pluginInstallation.create({
      data: {
        workspaceId,
        pluginId,
        config,
        status: 'ENABLED',
      },
    });
  }

  async getInstalledPlugins(workspaceId: string) {
    return this.prisma.pluginInstallation.findMany({
      where: { workspaceId },
      include: { plugin: true },
    });
  }

  async updatePluginConfig(workspaceId: string, pluginId: string, config: any) {
    return this.prisma.pluginInstallation.update({
      where: {
        pluginId_workspaceId: { workspaceId, pluginId },
      },
      data: { config },
    });
  }
}
