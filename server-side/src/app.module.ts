import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';
import { StoreModule } from './store/store.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { EmailModule } from './email/email.module';
import { CleanupModule } from './cleanup/cleanup.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenModule } from './token/token.module';
@Module({
  imports: [
    ScheduleModule.forRoot(), // for scheduled tasks
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ColorModule,
    CategoryModule,
    FileModule,
    StoreModule,
    OrderModule,
    StatisticsModule,
    ProductModule,
    ReviewModule,
    EmailModule,
    CleanupModule,
    TokenModule,
  ],
})
export class AppModule {}
