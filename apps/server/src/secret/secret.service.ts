import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class SecretService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;

  constructor(
    private supabase: SupabaseService,
    private configService: ConfigService,
  ) {
    const secret = this.configService.get<string>('ENCRYPTION_KEY') || 'default-key-at-least-32-chars-long!!';
    this.key = crypto.scryptSync(secret, 'salt', 32);
  }

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  private decrypt(text: string): string {
    const [ivHex, encryptedText] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async setSecret(workspaceId: string, key: string, value: string, description?: string) {
    const encryptedValue = this.encrypt(value);
    
    // Check if exists
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
    } else {
      const { data } = await this.supabase.client
        .from('Secret')
        .insert({ workspaceId, key, value: encryptedValue, description })
        .select()
        .single();
      return data;
    }
  }

  async getSecret(workspaceId: string, key: string): Promise<string> {
    const { data: secret } = await this.supabase.client
      .from('Secret')
      .select('*')
      .match({ workspaceId, key })
      .single();

    if (!secret) throw new BadRequestException('Secret not found');
    return this.decrypt(secret.value);
  }

  async listSecrets(workspaceId: string) {
    const { data: secrets } = await this.supabase.client
      .from('Secret')
      .select('key, description, createdAt')
      .eq('workspaceId', workspaceId);
      
    return secrets;
  }
}
