import {
  Controller,
  Get,
  Query,
  Param,
  UsePipes,
  HttpCode,
  Delete,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':productId')
  async create(
    @CurrentUser('id') userId: string,
    @Param('productId') productId: string,

    @Body() dto: ReviewDto,
  ) {
    console.log(userId);
    return this.reviewService.create(userId, productId, dto);
  }

  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.reviewService.delete(id, userId);
  }
}
