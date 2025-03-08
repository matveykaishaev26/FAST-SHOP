import { Module } from '@nestjs/common';
import { ProductVariantColorsService } from './product-variant-colors.service';
import { ProductVariantColorsController } from './product-variant-colors.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [ProductVariantColorsController],
  providers: [ProductVariantColorsService, PrismaService],
})
export class ProductVariantColorsModule {
  
}
