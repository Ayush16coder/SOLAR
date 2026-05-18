import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class SecretService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;

  constructor(
    private prisma: PrismaService,
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
    return this.prisma.secret.upsert({
      where: {
        workspaceId_key: { workspaceId, key },
      },
      update: { value: encryptedValue, description },
      create: { workspaceId, key, value: encryptedValue, description },
    });
  }

  async getSecret(workspaceId: string, key: string): Promise<string> {
    const secret = await this.prisma.secret.findUnique({
      where: {
        workspaceId_key: { workspaceId, key },
      },
    });

    if (!secret) throw new BadRequestException('Secret not found');
    return this.decrypt(secret.value);
  }

  async listSecrets(workspaceId: string) {
    const secrets = await this.prisma.secret.findMany({
      where: { workspaceId },
      select: { key: true, description: true, createdAt: true },
    });
    return secrets;
  }
}
