import { Injectable, BadRequestException } from '@nestjs/common';
import { GithubService } from '../github/github.service';

@Injectable()
export class FilesystemService {
  constructor(
    private githubService: GithubService,
  ) {}

  async getFileTree(workspaceId: string, owner: string, repo: string, branch: string = 'main') {
    const details = await this.githubService.getRepositoryDetails(workspaceId, owner, repo);
    // Use GitHub Trees API via Octokit (we'll add this to GithubService)
    return this.githubService.getTree(workspaceId, owner, repo, branch);
  }

  async getFileContent(workspaceId: string, owner: string, repo: string, path: string, branch: string = 'main') {
    return this.githubService.getFileContent(workspaceId, owner, repo, path, branch);
  }

  async saveFile(workspaceId: string, owner: string, repo: string, path: string, content: string, message: string, branch: string = 'main') {
    return this.githubService.updateFile(workspaceId, owner, repo, path, content, message, branch);
  }

  async deleteFile(workspaceId: string, owner: string, repo: string, path: string, message: string, branch: string = 'main') {
    return this.githubService.deleteFile(workspaceId, owner, repo, path, message, branch);
  }
}
