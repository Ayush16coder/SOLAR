import { Controller, Get, Post, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('fs')
@UseGuards(JwtAuthGuard)
export class FilesystemController {
  constructor(private fsService: FilesystemService) {}

  @Get('tree')
  async getTree(
    @Query('workspaceId') workspaceId: string,
    @Query('owner') owner: string,
    @Query('repo') repo: string,
    @Query('branch') branch?: string,
  ) {
    return this.fsService.getFileTree(workspaceId, owner, repo, branch);
  }

  @Get('file')
  async getFile(
    @Query('workspaceId') workspaceId: string,
    @Query('owner') owner: string,
    @Query('repo') repo: string,
    @Query('path') path: string,
    @Query('branch') branch?: string,
  ) {
    return this.fsService.getFileContent(workspaceId, owner, repo, path, branch);
  }

  @Post('file')
  async saveFile(
    @Body('workspaceId') workspaceId: string,
    @Body('owner') owner: string,
    @Body('repo') repo: string,
    @Body('path') path: string,
    @Body('content') content: string,
    @Body('message') message: string,
    @Body('branch') branch?: string,
  ) {
    return this.fsService.saveFile(workspaceId, owner, repo, path, content, message, branch);
  }

  @Delete('file')
  async deleteFile(
    @Body('workspaceId') workspaceId: string,
    @Body('owner') owner: string,
    @Body('repo') repo: string,
    @Body('path') path: string,
    @Body('message') message: string,
    @Body('branch') branch?: string,
  ) {
    return this.fsService.deleteFile(workspaceId, owner, repo, path, message, branch);
  }
}
