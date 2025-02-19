import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CleanupService {
  constructor(private prisma: PrismaService) {}
  
  private readonly logger = new Logger(CleanupService.name);

  async cleanupUnverifiedUsers() {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          emailVerifiedAt: null,
          createdAt: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // старше 24 часов
          },
        },
        select: {
          email: true,
        },
      });

      const emails = users.map((user) => user.email);

      // Удаляем токены верификации
      await this.prisma.verificationToken.deleteMany({
        where: {
          email: {
            in: emails,
          },
        },
      });

      // Удаляем пользователей
      await this.prisma.user.deleteMany({
        where: {
          emailVerifiedAt: null,
          createdAt: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // старше 24 часов
          },
        },
      });

      this.logger.log('Очистка неподтвержденных пользователей завершена.');
    } catch (err) {
      this.logger.error('Ошибка при очистке неподтвержденных пользователей', err);
    }
  }

  // Планируем задачу очистки каждый день в полночь
  @Cron(CronExpression.EVERY_10_HOURS) // Используем cron-выражение для ежедневной очистки
  startCleanupTask() {
    this.logger.log('Запуск очистки неподтвержденных пользователей');
    this.cleanupUnverifiedUsers();
  }
}
