import { AiService, AIModelProvider } from './ai.service';
export declare class AiController {
    private aiService;
    constructor(aiService: AiService);
    chat(messages: {
        role: string;
        content: string;
    }[], provider?: AIModelProvider): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
    debug(logs: string, provider?: AIModelProvider): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
    generate(type: 'docker' | 'k8s' | 'cicd', description: string, provider?: AIModelProvider): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
    assistant(query: string, provider?: AIModelProvider): Promise<string | (import("@langchain/core/messages").ContentBlock | import("@langchain/core/messages").ContentBlock.Text)[]>;
}
