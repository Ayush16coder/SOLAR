import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async createTeam(name: string, userId: string) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    return this.prisma.team.create({
      data: {
        name,
        slug,
        members: {
          create: {
            userId,
            role: Role.OWNER,
          },
        },
      },
    });
  }

  async inviteMember(teamId: string, userId: string, role: Role = Role.DEVELOPER) {
    return this.prisma.teamMember.create({
      data: {
        teamId,
        userId,
        role,
      },
    });
  }

  async getTeamMembers(teamId: string) {
    return this.prisma.teamMember.findMany({
      where: { teamId },
      include: { user: true },
    });
  }

  async removeMember(teamId: string, userId: string) {
    return this.prisma.teamMember.delete({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });
  }
}
