import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

  async hashPassword(password: string) {
    return await bycrypt.hash(password, 12);
  }

  async comparePassword(password: string, hashPassword: string) {
    return await bycrypt.compare(password, hashPassword);
  }

  async generateToken(payload: any, expiresIn: number = 5 * 60 * 1000) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await this.comparePassword(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new ForbiddenException('Email or password is incorrect.');
  }

  async login(user: UserDocument) {
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.generateToken(payload);
    const resfreshToken = await this.generateToken(payload, 10 * 60 * 1000);

    return {
      user: user,
      token: {
        accessToken,
        resfreshToken,
      },
    };
  }

  async register(user: RegisterDto) {
    const isExists = await this.userService.findUserByEmail(user.email);
    if (isExists) {
      throw new ConflictException('Email already exists');
    }
    return await this.userService.create({
      ...user,
      password: await this.hashPassword(user.password),
    });
  }
}
