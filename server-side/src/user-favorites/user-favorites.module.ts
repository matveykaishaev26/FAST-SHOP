import { Module } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { UserFavoritesController } from './user-favorites.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserFavoritesController],
  providers: [UserFavoritesService, PrismaService],
})
export class UserFavoritesModule {}
