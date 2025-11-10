import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../generated/prisma/enums';
import { ROLES_KEY } from './roles.decorator'
import { Observable } from 'rxjs';
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]);
      if (!requiredRoles) return true;

      const { user } = context.switchToHttp().getRequest();
      if (!user) throw new ForbiddenException('User not found in request');
      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Access denied');
      }
    return true
  }
} 