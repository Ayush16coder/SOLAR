import { Module } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { FilesystemController } from './filesystem.controller';
import { GithubModule } from '../github/github.module';

@Module({
  imports: [GithubModule],
  providers: [FilesystemService],
  controllers: [FilesystemController],
})
export class FilesystemModule {}
