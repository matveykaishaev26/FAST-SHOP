import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { CleanupController } from './cleanup.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CleanupController],
  providers: [CleanupService, PrismaService],
})
export class CleanupModule {}
