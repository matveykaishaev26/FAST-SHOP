import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required roles:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    // console.log('User:', user);


    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Нет прав доступа');
    }

    return true;
  }
}
