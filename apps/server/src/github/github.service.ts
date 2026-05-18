import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import { SupabaseService } from '../supabase/supabase.service';
import { EventService } from '../event/event.service';

@Injectable()
export class GithubService {
  constructor(
    private configService: ConfigService,
    private supabase: SupabaseService,
    private eventService: EventService,
  ) {}

  private getOctokit(accessToken: string) {
    return new Octokit({ auth: accessToken });
  }

  async handleCallback(code: string, workspaceId: string) {
    const clientId = this.configService.get('GITHUB_CLIENT_ID');
    const clientSecret = this.configService.get('GITHUB_CLIENT_SECRET');

    // Exchange code for access token
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new BadRequestException(data.error_description || 'GitHub OAuth failed');
    }

    const config = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_in ? Date.now() + data.expires_in * 1000 : null,
      scope: data.scope,
    };

    // Store integration in DB
    const { data: existing } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('id')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();

    if (existing) {
      const { data: updated } = await this.supabase.client
        .from('WorkspaceIntegration')
        .update({ config })
        .eq('id', existing.id)
        .select()
        .single();
      return updated;
    } else {
      const { data: inserted } = await this.supabase.client
        .from('WorkspaceIntegration')
        .insert({
          workspaceId,
          provider: 'GITHUB',
          config,
        })
        .select()
        .single();
      return inserted;
    }
  }

  async listRepositories(workspaceId: string) {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();

    if (!integration || !integration.config) {
      throw new BadRequestException('GitHub not connected for this workspace');
    }

    const config = integration.config as any;
    const octokit = this.getOctokit(config.accessToken);

    const { data } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    });

    return data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
      description: repo.description,
      private: repo.private,
      updatedAt: repo.updated_at,
    }));
  }

  async getRepositoryDetails(workspaceId: string, owner: string, repo: string) {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();
      
    if (!integration || !integration.config) {
      throw new BadRequestException('GitHub not connected');
    }
    const octokit = this.getOctokit((integration.config as any).accessToken);

    const [repository, branches] = await Promise.all([
      octokit.rest.repos.get({ owner, repo }),
      octokit.rest.repos.listBranches({ owner, repo }),
    ]);

    return {
      ...repository.data,
      branches: branches.data,
    };
  }

  async createWebhook(workspaceId: string, owner: string, repo: string) {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();
      
    if (!integration || !integration.config) {
      throw new BadRequestException('GitHub not connected');
    }
    const octokit = this.getOctokit((integration.config as any).accessToken);
    const webhookUrl = this.configService.get('GITHUB_WEBHOOK_URL');
    const webhookSecret = this.configService.get('GITHUB_WEBHOOK_SECRET');

    return octokit.rest.repos.createWebhook({
      owner,
      repo,
      config: {
        url: webhookUrl,
        content_type: 'json',
        secret: webhookSecret,
      },
      events: ['push', 'pull_request', 'deployment', 'workflow_run'],
    });
  }

  async updateFile(workspaceId: string, owner: string, repo: string, path: string, content: string, message: string, branch: string) {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();
      
    if (!integration || !integration.config) {
      throw new BadRequestException('GitHub not connected');
    }
    const octokit = this.getOctokit((integration.config as any).accessToken);

    // Get current file SHA
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    const sha = (fileData as any).sha;

    const result = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch,
    });

    // Find project to publish event to the correct room
    const { data: project } = await this.supabase.client
      .from('Project')
      .select('*')
      .match({ workspaceId, repoUrl: `https://github.com/${owner}/${repo}` })
      .single();

    if (project) {
      await this.eventService.publish(`project:${project.id}`, {
        type: 'FILE_UPDATED_ON_GITHUB',
        path,
        branch,
        commit: result.data.commit.sha,
      });
    }

    return result;
  }

  async getTree(workspaceId: string, owner: string, repo: string, branch: string) {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();
      
    if (!integration || !integration.config) {
      throw new BadRequestException('GitHub not connected');
    }
    const octokit = this.getOctokit((integration.config as any).accessToken);

    const { data } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: branch,
      recursive: 'true',
    });

    return data.tree;
  }

  async getFileContent(workspaceId: string, owner: string, repo: string, path: string, branch: string) {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();
      
    if (!integration || !integration.config) {
      throw new BadRequestException('GitHub not connected');
    }
    const octokit = this.getOctokit((integration.config as any).accessToken);

    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if ('content' in data) {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    throw new BadRequestException('Not a file');
  }

  async deleteFile(workspaceId: string, owner: string, repo: string, path: string, message: string, branch: string) {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();
      
    if (!integration || !integration.config) {
      throw new BadRequestException('GitHub not connected');
    }
    const octokit = this.getOctokit((integration.config as any).accessToken);

    const { data: fileData } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    return octokit.rest.repos.deleteFile({
      owner,
      repo,
      path,
      message,
      sha: (fileData as any).sha,
      branch,
    });
  }

  async createPullRequest(workspaceId: string, owner: string, repo: string, title: string, head: string, base: string, body?: string) {
    const { data: integration } = await this.supabase.client
      .from('WorkspaceIntegration')
      .select('*')
      .match({ workspaceId, provider: 'GITHUB' })
      .single();
      
    if (!integration || !integration.config) {
      throw new BadRequestException('GitHub not connected');
    }
    const octokit = this.getOctokit((integration.config as any).accessToken);

    return octokit.rest.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body,
    });
  }
}
