import { Controller } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // @Auth()
  // @Get('main/:storeId')
  // async getMainStatistics(@Param('storeId') storeId: string) {
  //   return this.statisticsService.getMainStatistics(storeId);
  // }

  // @Auth()
  // @Get('middle/:storeId')
  // async getMiddleStatistics(@Param('storeId') storeId: string) {
  //   return this.statisticsService.getMiddleStatistics(storeId);
  // }
}
