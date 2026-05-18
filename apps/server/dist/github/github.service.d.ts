import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service';
import { EventService } from '../event/event.service';
export declare class GithubService {
    private configService;
    private supabase;
    private eventService;
    constructor(configService: ConfigService, supabase: SupabaseService, eventService: EventService);
    private getOctokit;
    handleCallback(code: string, workspaceId: string): Promise<any>;
    listRepositories(workspaceId: string): Promise<any>;
    getRepositoryDetails(workspaceId: string, owner: string, repo: string): Promise<any>;
    createWebhook(workspaceId: string, owner: string, repo: string): Promise<any>;
    updateFile(workspaceId: string, owner: string, repo: string, path: string, content: string, message: string, branch: string): Promise<any>;
    getTree(workspaceId: string, owner: string, repo: string, branch: string): Promise<any>;
    getFileContent(workspaceId: string, owner: string, repo: string, path: string, branch: string): Promise<string>;
    deleteFile(workspaceId: string, owner: string, repo: string, path: string, message: string, branch: string): Promise<any>;
    createPullRequest(workspaceId: string, owner: string, repo: string, title: string, head: string, base: string, body?: string): Promise<any>;
}
