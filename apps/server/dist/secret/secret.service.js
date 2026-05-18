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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const config_1 = require("@nestjs/config");
const crypto = __importStar(require("crypto"));
let SecretService = class SecretService {
    supabase;
    configService;
    algorithm = 'aes-256-cbc';
    key;
    constructor(supabase, configService) {
        this.supabase = supabase;
        this.configService = configService;
        const secret = this.configService.get('ENCRYPTION_KEY') || 'default-key-at-least-32-chars-long!!';
        this.key = crypto.scryptSync(secret, 'salt', 32);
    }
    encrypt(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }
    decrypt(text) {
        const [ivHex, encryptedText] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    async setSecret(workspaceId, key, value, description) {
        const encryptedValue = this.encrypt(value);
        const { data: existing } = await this.supabase.client
            .from('Secret')
            .select('id')
            .match({ workspaceId, key })
            .single();
        if (existing) {
            const { data } = await this.supabase.client
                .from('Secret')
                .update({ value: encryptedValue, description })
                .eq('id', existing.id)
                .select()
                .single();
            return data;
        }
        else {
            const { data } = await this.supabase.client
                .from('Secret')
                .insert({ workspaceId, key, value: encryptedValue, description })
                .select()
                .single();
            return data;
        }
    }
    async getSecret(workspaceId, key) {
        const { data: secret } = await this.supabase.client
            .from('Secret')
            .select('*')
            .match({ workspaceId, key })
            .single();
        if (!secret)
            throw new common_1.BadRequestException('Secret not found');
        return this.decrypt(secret.value);
    }
    async listSecrets(workspaceId) {
        const { data: secrets } = await this.supabase.client
            .from('Secret')
            .select('key, description, createdAt')
            .eq('workspaceId', workspaceId);
        return secrets;
    }
};
exports.SecretService = SecretService;
exports.SecretService = SecretService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        config_1.ConfigService])
], SecretService);
//# sourceMappingURL=secret.service.js.map