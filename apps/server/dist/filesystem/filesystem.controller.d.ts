import { FilesystemService } from './filesystem.service';
export declare class FilesystemController {
    private fsService;
    constructor(fsService: FilesystemService);
    getTree(workspaceId: string, owner: string, repo: string, branch?: string): Promise<any>;
    getFile(workspaceId: string, owner: string, repo: string, path: string, branch?: string): Promise<string>;
    saveFile(workspaceId: string, owner: string, repo: string, path: string, content: string, message: string, branch?: string): Promise<any>;
    deleteFile(workspaceId: string, owner: string, repo: string, path: string, message: string, branch?: string): Promise<any>;
}
