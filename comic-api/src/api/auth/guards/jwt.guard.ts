import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '~/shared/decorators/public';
import { Roles, ROLES_KEY } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';
import { redisAccessTokenKey } from '../auth.service';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublicRoute(context)) {
      return true;
    }

    const canActivate = (await super.canActivate(context)) as boolean;
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const tokenStatus = await this.cacheManager.get(redisAccessTokenKey(token));

    if (!tokenStatus || tokenStatus === 'revoked') {
      throw new UnauthorizedException('Token has been revoked or is invalid');
    }

    return this.hasRequiredRoles(context, request);
  }

  private extractTokenFromRequest(request: any): string | null {
    const authHeader = request?.headers?.authorization;
    if (!authHeader) {
      return null;
    }

    const [, token] = authHeader.split(' ');
    return token || null;
  }

  private isPublicRoute(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private hasRequiredRoles(context: ExecutionContext, request: any): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (request?.user?.role === Role.Admin) {
      return true;
    }

    if (!requiredRoles || requiredRoles.length <= 0) {
      return true;
    }
    return requiredRoles?.some((role) => role === request.user.role);
  }
}
