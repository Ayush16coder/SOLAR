"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VercelAdapter = void 0;
const types_1 = require("../../types");
const axios_1 = __importDefault(require("axios"));
class VercelAdapter {
    apiToken;
    name = 'VERCEL';
    baseUrl = 'https://api.vercel.com';
    constructor(apiToken) {
        this.apiToken = apiToken;
    }
    async deploy(options) {
        const { data } = await axios_1.default.post(`${this.baseUrl}/v13/deployments`, {
            name: options.projectId,
            gitSource: {
                type: 'github',
                repoId: options.config.repoId,
                ref: options.branch || 'main',
            },
        }, {
            headers: { Authorization: `Bearer ${this.apiToken}` },
        });
        return {
            deploymentId: data.id,
            url: data.url,
            status: this.mapStatus(data.status),
            rawResponse: data,
        };
    }
    async rollback(deploymentId) {
        throw new Error('Rollback not implemented for Vercel adapter yet');
    }
    async getStatus(deploymentId) {
        const { data } = await axios_1.default.get(`${this.baseUrl}/v13/deployments/${deploymentId}`, {
            headers: { Authorization: `Bearer ${this.apiToken}` },
        });
        return this.mapStatus(data.status);
    }
    async getLogs(deploymentId) {
        return 'Fetching logs...';
    }
    async setEnv(projectId, envVars) {
        for (const [key, value] of Object.entries(envVars)) {
            await axios_1.default.post(`${this.baseUrl}/v9/projects/${projectId}/env`, { key, value, type: 'plain', target: ['production', 'preview', 'development'] }, { headers: { Authorization: `Bearer ${this.apiToken}` } });
        }
    }
    mapStatus(vercelStatus) {
        switch (vercelStatus) {
            case 'READY': return types_1.DeploymentStatus.SUCCESS;
            case 'BUILDING': return types_1.DeploymentStatus.BUILDING;
            case 'ERROR': return types_1.DeploymentStatus.FAILED;
            case 'CANCELED': return types_1.DeploymentStatus.CANCELLED;
            default: return types_1.DeploymentStatus.QUEUED;
        }
    }
}
exports.VercelAdapter = VercelAdapter;
//# sourceMappingURL=vercel.adapter.js.map