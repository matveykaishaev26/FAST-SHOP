
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  findUnique(arg0: { where: { email: string; password: boolean; }; }) {
    throw new Error('Method not implemented.');
  }
  async onModuleInit() {
    await this.$connect();
  }
}
