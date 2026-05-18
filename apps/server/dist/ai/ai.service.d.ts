import { ConfigService } from '@nestjs/config';
export declare enum AIModelProvider {
    OPENAI = "openai",
    CLAUDE = "claude",
    GEMINI = "gemini"
}
export declare class AiService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    private getModel;
    chat(messages: {
        role: string;
        content: string;
    }[], provider?: AIModelProvider): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
    debugDeployment(logs: string, provider?: AIModelProvider): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
    generateDevOpsConfig(type: 'docker' | 'k8s' | 'cicd', projectDescription: string, provider?: AIModelProvider): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
    explainInfrastructure(query: string, provider?: AIModelProvider): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
}
