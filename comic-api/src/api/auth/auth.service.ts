import { ConfigService } from '@nestjs/config';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';

import { UserService } from '~/api/user/user.service';
import { UserDocument } from '~/schemas/user.schema';
import { RegisterDto } from './dtos/register.dto';
import { JwtPayload } from '~/shared/types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  private async hashPassword(password: string) {
    return await bycrypt.hash(password, 12);
  }

  private async comparePassword(password: string, hashPassword: string) {
    return await bycrypt.compare(password, hashPassword);
  }

  private async createToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRECT'),
      expiresIn: '7d',
    });
  }

  private async createRefresToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH'),
      expiresIn: '90d',
    });
  }

  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isMatched = await this.comparePassword(password, user.password);
    if (!isMatched) {
      return null;
    }

    const { password: _, ...result } = user.toJSON();
    return result;
  }

  async login(user: UserDocument) {
    const payload: JwtPayload = {
      userId: user._id,
    };

    const [accessToken, refeshToken] = await Promise.all([
      this.createToken(payload),
      this.createRefresToken(payload),
    ]);

    return {
      user: user,
      token: {
        accessToken,
        refeshToken,
      },
    };
  }

  async register(user: RegisterDto) {
    const isExists = await this.userService.findUserByEmail(user.email);
    if (isExists) {
      throw new ConflictException('Email already exists');
    }
    return await this.userService.register({
      ...user,
      password: await this.hashPassword(user.password),
    });
  }

  async generateAccessToken(userId: string) {
    const payload: JwtPayload = {
      userId: userId,
    };

    return await this.createToken(payload);
  }
}
