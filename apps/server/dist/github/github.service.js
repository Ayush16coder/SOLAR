"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const octokit_1 = require("octokit");
const supabase_service_1 = require("../supabase/supabase.service");
const event_service_1 = require("../event/event.service");
let GithubService = class GithubService {
    configService;
    supabase;
    eventService;
    constructor(configService, supabase, eventService) {
        this.configService = configService;
        this.supabase = supabase;
        this.eventService = eventService;
    }
    getOctokit(accessToken) {
        return new octokit_1.Octokit({ auth: accessToken });
    }
    async handleCallback(code, workspaceId) {
        const clientId = this.configService.get('GITHUB_CLIENT_ID');
        const clientSecret = this.configService.get('GITHUB_CLIENT_SECRET');
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
            throw new common_1.BadRequestException(data.error_description || 'GitHub OAuth failed');
        }
        const config = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: data.expires_in ? Date.now() + data.expires_in * 1000 : null,
            scope: data.scope,
        };
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
        }
        else {
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
    async listRepositories(workspaceId) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider: 'GITHUB' })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException('GitHub not connected for this workspace');
        }
        const config = integration.config;
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
    async getRepositoryDetails(workspaceId, owner, repo) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider: 'GITHUB' })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException('GitHub not connected');
        }
        const octokit = this.getOctokit(integration.config.accessToken);
        const [repository, branches] = await Promise.all([
            octokit.rest.repos.get({ owner, repo }),
            octokit.rest.repos.listBranches({ owner, repo }),
        ]);
        return {
            ...repository.data,
            branches: branches.data,
        };
    }
    async createWebhook(workspaceId, owner, repo) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider: 'GITHUB' })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException('GitHub not connected');
        }
        const octokit = this.getOctokit(integration.config.accessToken);
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
    async updateFile(workspaceId, owner, repo, path, content, message, branch) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider: 'GITHUB' })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException('GitHub not connected');
        }
        const octokit = this.getOctokit(integration.config.accessToken);
        const { data: fileData } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
            ref: branch,
        });
        const sha = fileData.sha;
        const result = await octokit.rest.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message,
            content: Buffer.from(content).toString('base64'),
            sha,
            branch,
        });
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
    async getTree(workspaceId, owner, repo, branch) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider: 'GITHUB' })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException('GitHub not connected');
        }
        const octokit = this.getOctokit(integration.config.accessToken);
        const { data } = await octokit.rest.git.getTree({
            owner,
            repo,
            tree_sha: branch,
            recursive: 'true',
        });
        return data.tree;
    }
    async getFileContent(workspaceId, owner, repo, path, branch) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider: 'GITHUB' })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException('GitHub not connected');
        }
        const octokit = this.getOctokit(integration.config.accessToken);
        const { data } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
            ref: branch,
        });
        if ('content' in data) {
            return Buffer.from(data.content, 'base64').toString('utf-8');
        }
        throw new common_1.BadRequestException('Not a file');
    }
    async deleteFile(workspaceId, owner, repo, path, message, branch) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider: 'GITHUB' })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException('GitHub not connected');
        }
        const octokit = this.getOctokit(integration.config.accessToken);
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
            sha: fileData.sha,
            branch,
        });
    }
    async createPullRequest(workspaceId, owner, repo, title, head, base, body) {
        const { data: integration } = await this.supabase.client
            .from('WorkspaceIntegration')
            .select('*')
            .match({ workspaceId, provider: 'GITHUB' })
            .single();
        if (!integration || !integration.config) {
            throw new common_1.BadRequestException('GitHub not connected');
        }
        const octokit = this.getOctokit(integration.config.accessToken);
        return octokit.rest.pulls.create({
            owner,
            repo,
            title,
            head,
            base,
            body,
        });
    }
};
exports.GithubService = GithubService;
exports.GithubService = GithubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        supabase_service_1.SupabaseService,
        event_service_1.EventService])
], GithubService);
//# sourceMappingURL=github.service.js.map