import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { redisRefreshTokenKey } from '../auth.service';

@Injectable()
export default class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean;
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const tokenStatus = await this.cacheManager.get(redisRefreshTokenKey(token));

    if (!tokenStatus || tokenStatus === 'revoked') {
      throw new UnauthorizedException('Token has been revoked or is invalid');
    }

    return true;
  }

  private extractTokenFromRequest(request: any): string | null {
    const authHeader = request?.headers?.authorization;
    if (!authHeader) {
      return null;
    }

    const [, token] = authHeader.split(' ');
    return token || null;
  }
}
