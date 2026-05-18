import { Controller, Post, Get, Body, Query, UseGuards, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('github')
@UseGuards(JwtAuthGuard)
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Post('callback')
  async callback(@Body('code') code: string, @Body('workspaceId') workspaceId: string) {
    return this.githubService.handleCallback(code, workspaceId);
  }

  @Get('repos')
  async listRepos(@Query('workspaceId') workspaceId: string) {
    return this.githubService.listRepositories(workspaceId);
  }

  @Get('repos/:owner/:repo')
  async getRepoDetails(
    @Query('workspaceId') workspaceId: string,
    @Param('owner') owner: string,
    @Param('repo') repo: string,
  ) {
    return this.githubService.getRepositoryDetails(workspaceId, owner, repo);
  }

  @Post('webhooks')
  async setupWebhook(
    @Body('workspaceId') workspaceId: string,
    @Body('owner') owner: string,
    @Body('repo') repo: string,
  ) {
    return this.githubService.createWebhook(workspaceId, owner, repo);
  }

  @Post('files/update')
  async updateFile(
    @Body('workspaceId') workspaceId: string,
    @Body('owner') owner: string,
    @Body('repo') repo: string,
    @Body('path') path: string,
    @Body('content') content: string,
    @Body('message') message: string,
    @Body('branch') branch: string,
  ) {
    return this.githubService.updateFile(workspaceId, owner, repo, path, content, message, branch);
  }

  @Post('pulls')
  async createPR(
    @Body('workspaceId') workspaceId: string,
    @Body('owner') owner: string,
    @Body('repo') repo: string,
    @Body('title') title: string,
    @Body('head') head: string,
    @Body('base') base: string,
    @Body('body') body?: string,
  ) {
    return this.githubService.createPullRequest(workspaceId, owner, repo, title, head, base, body);
  }
}
