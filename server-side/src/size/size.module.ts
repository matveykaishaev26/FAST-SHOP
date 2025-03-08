import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [SizeController],
  providers: [SizeService , PrismaService],
})
export class SizeModule {}
