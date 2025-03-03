import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
