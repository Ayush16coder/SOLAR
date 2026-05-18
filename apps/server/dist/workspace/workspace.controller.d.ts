import { WorkspaceService } from './workspace.service';
import { ProviderType } from '../types';
export declare class WorkspaceController {
    private workspaceService;
    constructor(workspaceService: WorkspaceService);
    createWorkspace(name: string, teamId: string): Promise<any>;
    getWorkspaces(teamId: string): Promise<any[]>;
    addIntegration(workspaceId: string, provider: ProviderType, config: any): Promise<any>;
    getProjects(workspaceId: string): Promise<any[] | null>;
    getProject(projectId: string): Promise<any>;
}
