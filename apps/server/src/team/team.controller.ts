import { Controller, Post, Get, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  async createTeam(@Body('name') name: string, @GetUser('id') userId: string) {
    return this.teamService.createTeam(name, userId);
  }

  @Get(':id/members')
  async getMembers(@Param('id') teamId: string) {
    return this.teamService.getTeamMembers(teamId);
  }

  @Post(':id/invite')
  async inviteMember(
    @Param('id') teamId: string,
    @Body('userId') userId: string,
    @Body('role') role: Role,
  ) {
    return this.teamService.inviteMember(teamId, userId, role);
  }

  @Delete(':id/members/:userId')
  async removeMember(@Param('id') teamId: string, @Param('userId') userId: string) {
    return this.teamService.removeMember(teamId, userId);
  }
}
