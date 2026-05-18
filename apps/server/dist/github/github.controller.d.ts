import { GithubService } from './github.service';
export declare class GithubController {
    private githubService;
    constructor(githubService: GithubService);
    callback(code: string, workspaceId: string): Promise<any>;
    listRepos(workspaceId: string): Promise<any>;
    getRepoDetails(workspaceId: string, owner: string, repo: string): Promise<any>;
    setupWebhook(workspaceId: string, owner: string, repo: string): Promise<any>;
    updateFile(workspaceId: string, owner: string, repo: string, path: string, content: string, message: string, branch: string): Promise<any>;
    createPR(workspaceId: string, owner: string, repo: string, title: string, head: string, base: string, body?: string): Promise<any>;
}
