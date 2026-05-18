"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RailwayAdapter = void 0;
const types_1 = require("../../types");
class RailwayAdapter {
    apiToken;
    name = 'RAILWAY';
    constructor(apiToken) {
        this.apiToken = apiToken;
    }
    async deploy(options) {
        return {
            deploymentId: 'railway-dep-id',
            status: types_1.DeploymentStatus.QUEUED,
        };
    }
    async rollback(deploymentId) {
        throw new Error('Not implemented');
    }
    async getStatus(deploymentId) {
        return types_1.DeploymentStatus.SUCCESS;
    }
    async getLogs(deploymentId) {
        return 'Railway logs';
    }
    async setEnv(projectId, envVars) {
    }
}
exports.RailwayAdapter = RailwayAdapter;
//# sourceMappingURL=railway.adapter.js.map