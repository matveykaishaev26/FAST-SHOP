import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { TechnologyController } from './technology.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [TechnologyController],
  providers: [TechnologyService, PrismaService],
})
export class TechnologyModule {}
