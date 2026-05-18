import { SupabaseService } from '../supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private supabase;
    private jwtService;
    private configService;
    constructor(supabase: SupabaseService, jwtService: JwtService, configService: ConfigService);
    register(email: string, password: string, fullName?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateTokens(userId: string, email: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
}
