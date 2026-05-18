"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const webhooks_service_1 = require("./webhooks.service");
const config_1 = require("@nestjs/config");
const crypto = __importStar(require("crypto"));
let WebhooksController = class WebhooksController {
    webhooksService;
    configService;
    constructor(webhooksService, configService) {
        this.webhooksService = webhooksService;
        this.configService = configService;
    }
    async handleGithub(payload, event, signature) {
        const secret = this.configService.get('GITHUB_WEBHOOK_SECRET');
        if (secret && !this.verifySignature(payload, signature, secret)) {
            throw new common_1.BadRequestException('Invalid signature');
        }
        await this.webhooksService.handleGithubWebhook(payload, event);
        return { received: true };
    }
    verifySignature(payload, signature, secret) {
        const hmac = crypto.createHmac('sha256', secret);
        const digest = 'sha256=' + hmac.update(JSON.stringify(payload)).digest('hex');
        return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)('github'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-github-event')),
    __param(2, (0, common_1.Headers)('x-hub-signature-256')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "handleGithub", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [webhooks_service_1.WebhooksService,
        config_1.ConfigService])
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map