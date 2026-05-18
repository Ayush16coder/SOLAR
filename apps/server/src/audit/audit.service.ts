import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(data: {
    workspaceId: string;
    userId: string;
    action: string;
    resource: string;
    resourceId: string;
    metadata?: any;
  }) {
    return this.prisma.auditLog.create({
      data,
    });
  }

  async getLogs(workspaceId: string) {
    return this.prisma.auditLog.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}
