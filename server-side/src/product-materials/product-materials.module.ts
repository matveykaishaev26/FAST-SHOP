import { Module } from '@nestjs/common';
import { ProductMaterialsService } from './product-materials.service';
import { ProductMaterialsController } from './product-materials.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductMaterialsController],
  providers: [ProductMaterialsService, PrismaService],
})
export class ProductMaterialsModule {}
