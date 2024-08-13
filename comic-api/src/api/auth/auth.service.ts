import { ConfigService } from '@nestjs/config';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '~/api/user/user.service';
import { UserDocument } from '~/schemas/user.schema';
import { RegisterDto } from './dtos/register.dto';
import { JwtPayload } from '~/shared/types/jwt-payload.type';
import { LogoutDto } from './dtos/logout.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

const ACCESS_TOKEN_EXPIRY = 7 * 24 * 60 * 60; // 7 days
const REFRESH_TOKEN_EXPIRY = 90 * 24 * 60 * 60; // 90 days

const ACCESS_TOKEN_TTL = ACCESS_TOKEN_EXPIRY * 1000;
const REFRESH_TOKEN_TTL = REFRESH_TOKEN_EXPIRY * 1000;

// ================== Redis Key Generation ====================
export const redisAccessTokenKey = (token: string) => `accessToken:${token}`;
export const redisRefreshTokenKey = (token: string) => `refreshToken:${token}`;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // ================== Common ====================
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  private async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  private async createToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
  }

  private async createRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH'),
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
  }

  // ================== Functionality ====================
  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.userService.findUserByEmail(email);
    if (!user || !(await this.comparePassword(password, user.password))) {
      return null;
    }

    const { password: _, ...result } = user.toJSON();
    return result;
  }

  async login(user: UserDocument) {
    const payload: JwtPayload = { userId: user._id };

    const [accessToken, refreshToken] = await Promise.all([
      this.createToken(payload),
      this.createRefreshToken(payload),
    ]);

    // Set tokens to whitelist
    await Promise.all([
      this.cacheManager.set(redisAccessTokenKey(accessToken), 'valid', ACCESS_TOKEN_TTL),
      this.cacheManager.set(redisRefreshTokenKey(refreshToken), 'valid', REFRESH_TOKEN_TTL),
    ]);

    return {
      user,
      token: { accessToken, refreshToken },
    };
  }

  async register(user: RegisterDto) {
    const existingUser = await this.userService.findUserByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(user.password);
    return this.userService.register({ ...user, password: hashedPassword });
  }

  async refreshTokens(userId: string, oldAccessToken: string) {
    const payload: JwtPayload = { userId };

    const accessToken = await this.createToken(payload);

    // Remove old access token
    await this.cacheManager.del(redisAccessTokenKey(oldAccessToken));

    // Set new access token
    await this.cacheManager.set(redisAccessTokenKey(accessToken), 'valid', ACCESS_TOKEN_TTL);

    return accessToken;
  }

  async logout({ accessToken, refreshToken }: LogoutDto) {
    // Remove both access and refresh tokens
    await Promise.all([
      this.cacheManager.del(redisAccessTokenKey(accessToken)),
      this.cacheManager.del(redisRefreshTokenKey(refreshToken)),
    ]);
  }
}
