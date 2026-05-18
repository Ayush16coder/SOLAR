import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { EventModule } from '../event/event.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [EventModule, AiModule],
  providers: [MonitoringService],
  controllers: [MonitoringController],
  exports: [MonitoringService],
})
export class MonitoringModule {}
