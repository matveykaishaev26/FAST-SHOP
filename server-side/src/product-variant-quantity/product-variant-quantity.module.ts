import { Module } from '@nestjs/common';
import { ProductVariantQuantityService } from './product-variant-quantity.service';
import { ProductVariantQuantityController } from './product-variant-quantity.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductVariantQuantityController],
  providers: [ProductVariantQuantityService, PrismaService],
})
export class ProductVariantQuantityModule {}
