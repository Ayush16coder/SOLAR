"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetlifyAdapter = void 0;
const types_1 = require("../../types");
const axios_1 = __importDefault(require("axios"));
class NetlifyAdapter {
    apiToken;
    name = 'NETLIFY';
    baseUrl = 'https://api.netlify.com/api/v1';
    constructor(apiToken) {
        this.apiToken = apiToken;
    }
    async deploy(options) {
        const siteId = options.config.siteId;
        const { data } = await axios_1.default.post(`${this.baseUrl}/sites/${siteId}/builds`, {}, { headers: { Authorization: `Bearer ${this.apiToken}` } });
        return {
            deploymentId: data.id,
            status: types_1.DeploymentStatus.QUEUED,
            rawResponse: data,
        };
    }
    async rollback(deploymentId) {
        throw new Error('Rollback not implemented for Netlify');
    }
    async getStatus(deploymentId) {
        return types_1.DeploymentStatus.SUCCESS;
    }
    async getLogs(deploymentId) {
        return 'Netlify logs';
    }
    async setEnv(projectId, envVars) {
    }
}
exports.NetlifyAdapter = NetlifyAdapter;
//# sourceMappingURL=netlify.adapter.js.map