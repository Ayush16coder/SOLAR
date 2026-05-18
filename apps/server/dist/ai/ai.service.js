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
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = exports.AIModelProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("@langchain/openai");
const anthropic_1 = require("@langchain/anthropic");
const google_genai_1 = require("@langchain/google-genai");
const messages_1 = require("@langchain/core/messages");
var AIModelProvider;
(function (AIModelProvider) {
    AIModelProvider["OPENAI"] = "openai";
    AIModelProvider["CLAUDE"] = "claude";
    AIModelProvider["GEMINI"] = "gemini";
})(AIModelProvider || (exports.AIModelProvider = AIModelProvider = {}));
let AiService = AiService_1 = class AiService {
    configService;
    logger = new common_1.Logger(AiService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    getModel(provider = AIModelProvider.OPENAI) {
        switch (provider) {
            case AIModelProvider.CLAUDE:
                return new anthropic_1.ChatAnthropic({
                    anthropicApiKey: this.configService.get('ANTHROPIC_API_KEY'),
                    modelName: 'claude-3-5-sonnet-20240620',
                });
            case AIModelProvider.GEMINI:
                return new google_genai_1.ChatGoogleGenerativeAI({
                    apiKey: this.configService.get('GOOGLE_AI_API_KEY'),
                    model: 'gemini-1.5-pro',
                });
            case AIModelProvider.OPENAI:
            default:
                return new openai_1.ChatOpenAI({
                    openAIApiKey: this.configService.get('OPENAI_API_KEY'),
                    modelName: 'gpt-4o',
                });
        }
    }
    async chat(messages, provider) {
        const model = this.getModel(provider);
        const langchainMessages = messages.map((m) => m.role === 'system' ? new messages_1.SystemMessage(m.content) : new messages_1.HumanMessage(m.content));
        const response = await model.invoke(langchainMessages);
        return response.content;
    }
    async debugDeployment(logs, provider) {
        const systemPrompt = `You are a DevOps expert. Analyze the following deployment logs and identify the root cause of any errors. Provide a concise explanation and a fix.`;
        const response = await this.chat([
            { role: 'system', content: systemPrompt },
            { role: 'human', content: `Deployment Logs:\n${logs}` }
        ], provider);
        return response;
    }
    async generateDevOpsConfig(type, projectDescription, provider) {
        const systemPrompt = `You are a cloud infrastructure architect. Generate a high-quality ${type} configuration based on the project description. Return ONLY the code block.`;
        const response = await this.chat([
            { role: 'system', content: systemPrompt },
            { role: 'human', content: `Project Description: ${projectDescription}` }
        ], provider);
        return response;
    }
    async explainInfrastructure(query, provider) {
        const systemPrompt = `You are an Infrastructure assistant for the Solar platform. Help users with cloud-related questions (AWS, GCP, Azure, K8s).`;
        const response = await this.chat([
            { role: 'system', content: systemPrompt },
            { role: 'human', content: query }
        ], provider);
        return response;
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map