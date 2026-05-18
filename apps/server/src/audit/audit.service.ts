import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuditService {
  constructor(private supabase: SupabaseService) {}

  async log(data: {
    workspaceId: string;
    userId: string;
    action: string;
    resource: string;
    resourceId: string;
    metadata?: any;
  }) {
    const { data: result } = await this.supabase.client
      .from('AuditLog')
      .insert(data)
      .select()
      .single();
    return result;
  }

  async getLogs(workspaceId: string) {
    const { data: logs } = await this.supabase.client
      .from('AuditLog')
      .select('*')
      .eq('workspaceId', workspaceId)
      .order('createdAt', { ascending: false })
      .limit(100);
    return logs;
  }
}
