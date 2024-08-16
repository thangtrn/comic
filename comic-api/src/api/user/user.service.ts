import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '~/schemas/user.schema';
import { RegisterDto } from '~/api/auth/dtos/register.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async register(user: RegisterDto) {
    return await this.userModel.create(user);
  }

  async findUserById(_id: Types.ObjectId | string) {
    return await this.userModel.findById(_id);
  }

  // ----------------- -----------------
  async testRedis() {
    return await this.cacheManager.store.keys('refreshToken:*');
  }
}
