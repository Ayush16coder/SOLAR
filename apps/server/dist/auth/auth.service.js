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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    supabase;
    jwtService;
    configService;
    constructor(supabase, jwtService, configService) {
        this.supabase = supabase;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(email, password, fullName) {
        const { data: existingUser } = await this.supabase.client
            .from('User')
            .select('id')
            .eq('email', email)
            .single();
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data: user, error } = await this.supabase.client
            .from('User')
            .insert({
            email,
            password: hashedPassword,
            fullName,
        })
            .select()
            .single();
        if (error || !user)
            throw new Error(error?.message || 'Failed to create user');
        return this.generateTokens(user.id, user.email);
    }
    async login(email, password) {
        const { data: user } = await this.supabase.client
            .from('User')
            .select('*')
            .eq('email', email)
            .single();
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.generateTokens(user.id, user.email);
    }
    async generateTokens(userId, email) {
        const payload = { sub: userId, email };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: '15m',
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
        });
        await this.supabase.client.from('RefreshToken').insert({
            token: refreshToken,
            userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(refreshToken) {
        const { data: tokenData } = await this.supabase.client
            .from('RefreshToken')
            .select('*, user:User(*)')
            .eq('token', refreshToken)
            .single();
        if (!tokenData || new Date(tokenData.expiresAt) < new Date()) {
            if (tokenData) {
                await this.supabase.client.from('RefreshToken').delete().eq('id', tokenData.id);
            }
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        await this.supabase.client.from('RefreshToken').delete().eq('id', tokenData.id);
        return this.generateTokens(tokenData.userId, tokenData.user.email);
    }
    async logout(refreshToken) {
        await this.supabase.client.from('RefreshToken').delete().eq('token', refreshToken);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map