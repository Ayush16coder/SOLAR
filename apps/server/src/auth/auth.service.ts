import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(email: string, password: string, fullName?: string) {
    const { data: existingUser } = await this.supabase.client
      .from('User')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new ConflictException('User already exists');
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

    if (error || !user) throw new Error(error?.message || 'Failed to create user');

    return this.generateTokens(user.id, user.email);
  }

  async login(email: string, password: string) {
    const { data: user } = await this.supabase.client
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email);
  }

  async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    // Store refresh token in DB
    await this.supabase.client.from('RefreshToken').insert({
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    const { data: tokenData } = await this.supabase.client
      .from('RefreshToken')
      .select('*, user:User(*)')
      .eq('token', refreshToken)
      .single();

    if (!tokenData || new Date(tokenData.expiresAt) < new Date()) {
      if (tokenData) {
        await this.supabase.client.from('RefreshToken').delete().eq('id', tokenData.id);
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Remove old refresh token
    await this.supabase.client.from('RefreshToken').delete().eq('id', tokenData.id);

    return this.generateTokens(tokenData.userId, tokenData.user.email);
  }

  async logout(refreshToken: string) {
    await this.supabase.client.from('RefreshToken').delete().eq('token', refreshToken);
  }
}
