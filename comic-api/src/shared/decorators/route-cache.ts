import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

export default function RouteCache(ttl: number = 60 * 1000) {
  return applyDecorators(UseInterceptors(CacheInterceptor), CacheTTL(ttl));
}
