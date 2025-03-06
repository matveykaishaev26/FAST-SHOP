import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { EmailModule } from './email/email.module';
import { CleanupModule } from './cleanup/cleanup.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenModule } from './token/token.module';
import { MaterialModule } from './material/material.module';
import { TechnologyModule } from './technology/technology.module';
import { BrandModule } from './brand/brand.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { ProductVariantQuantityModule } from './product-variant-quantity/product-variant-quantity.module';
import { StyleModule } from './style/style.module';
import { ProductMaterialsModule } from './product-materials/product-materials.module';
@Module({
  imports: [
    ScheduleModule.forRoot(), // for scheduled tasks
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CategoryModule,
    FileModule,
    OrderModule,
    ProductModule,
    ReviewModule,
    EmailModule,
    CleanupModule,
    TokenModule,
    MaterialModule,
    TechnologyModule,
    BrandModule,
    ProductVariantModule,
    ProductVariantQuantityModule,
    StyleModule,
    ProductMaterialsModule,
  ],
})
export class AppModule {}
