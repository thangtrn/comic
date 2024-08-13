import { Injectable, CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '~/shared/decorators/public';
import { ROLES_KEY } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (isPublic || !requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return !!requiredRoles?.some((role) => role === user?.role);
  }
}
