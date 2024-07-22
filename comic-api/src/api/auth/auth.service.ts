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
  ) {}

  private async hashPassword(password: string) {
    return await bycrypt.hash(password, 12);
  }

  private async comparePassword(password: string, hashPassword: string) {
    return await bycrypt.compare(password, hashPassword);
  }

  private generateToken(payload: any, expiresIn: number = 10 * 60 * 1000) {
    try {
      return this.jwtService.sign(payload, {
        expiresIn: expiresIn,
      });
    } catch (error) {
      console.log('🚀 ~ AuthService ~ generateToken ~ error:', error);
    }
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
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return {
      user: user,
      token: {
        accessToken: this.generateToken(payload),
        resfreshToken: this.generateToken(payload, 30 * 60 * 1000),
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
}
