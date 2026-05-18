import { GithubService } from '../github/github.service';
export declare class FilesystemService {
    private githubService;
    constructor(githubService: GithubService);
    getFileTree(workspaceId: string, owner: string, repo: string, branch?: string): Promise<any>;
    getFileContent(workspaceId: string, owner: string, repo: string, path: string, branch?: string): Promise<string>;
    saveFile(workspaceId: string, owner: string, repo: string, path: string, content: string, message: string, branch?: string): Promise<any>;
    deleteFile(workspaceId: string, owner: string, repo: string, path: string, message: string, branch?: string): Promise<any>;
}
