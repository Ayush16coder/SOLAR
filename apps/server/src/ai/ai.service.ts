import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage, BaseMessage } from '@langchain/core/messages';

export enum AIModelProvider {
  OPENAI = 'openai',
  CLAUDE = 'claude',
  GEMINI = 'gemini',
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {}

  private getModel(provider: AIModelProvider = AIModelProvider.OPENAI) {
    switch (provider) {
      case AIModelProvider.CLAUDE:
        return new ChatAnthropic({
          anthropicApiKey: this.configService.get('ANTHROPIC_API_KEY'),
          modelName: 'claude-3-5-sonnet-20240620',
        });
      case AIModelProvider.GEMINI:
        return new ChatGoogleGenerativeAI({
          apiKey: this.configService.get('GOOGLE_AI_API_KEY'),
          model: 'gemini-1.5-pro',
        });
      case AIModelProvider.OPENAI:
      default:
        return new ChatOpenAI({
          openAIApiKey: this.configService.get('OPENAI_API_KEY'),
          modelName: 'gpt-4o',
        });
    }
  }

  async chat(messages: { role: string; content: string }[], provider?: AIModelProvider) {
    const model = this.getModel(provider);
    const langchainMessages: BaseMessage[] = messages.map((m) => 
      m.role === 'system' ? new SystemMessage(m.content) : new HumanMessage(m.content)
    );

    const response = await model.invoke(langchainMessages);
    return response.content;
  }

  async debugDeployment(logs: string, provider?: AIModelProvider) {
    const systemPrompt = `You are a DevOps expert. Analyze the following deployment logs and identify the root cause of any errors. Provide a concise explanation and a fix.`;
    const response = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'human', content: `Deployment Logs:\n${logs}` }
    ], provider);
    return response;
  }

  async generateDevOpsConfig(type: 'docker' | 'k8s' | 'cicd', projectDescription: string, provider?: AIModelProvider) {
    const systemPrompt = `You are a cloud infrastructure architect. Generate a high-quality ${type} configuration based on the project description. Return ONLY the code block.`;
    const response = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'human', content: `Project Description: ${projectDescription}` }
    ], provider);
    return response;
  }

  async explainInfrastructure(query: string, provider?: AIModelProvider) {
    const systemPrompt = `You are an Infrastructure assistant for the Solar platform. Help users with cloud-related questions (AWS, GCP, Azure, K8s).`;
    const response = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'human', content: query }
    ], provider);
    return response;
  }
}
