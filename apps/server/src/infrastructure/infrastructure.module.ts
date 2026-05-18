import { Module } from '@nestjs/common';
import { InfrastructureService } from './infrastructure.service';
import { InfrastructureController } from './infrastructure.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [InfrastructureService],
  controllers: [InfrastructureController],
  exports: [InfrastructureService],
})
export class InfrastructureModule {}
