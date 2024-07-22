import { ConfigService } from '@nestjs/config';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';

import { UserService } from '~/api/user/user.service';
import { UserDocument } from '~/schemas/user.schema';
import { RegisterDto } from './dtos/register.dto';

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
      expiresIn: '30s',
    });
  }

  private async createRefresToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH'),
      expiresIn: '10m',
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    const isMatched = await this.comparePassword(password, user.password);
    if (user && isMatched) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload: Express.User = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
    const user = await this.userService.findUserById(userId);
    const payload: Express.User = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return await this.createToken(payload);
  }
}
