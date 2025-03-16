import { Module } from '@nestjs/common';
import { StyleService } from './style.service';
import { StyleController } from './style.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [StyleController],
  providers: [StyleService, PrismaService],
})
export class StyleModule {}
