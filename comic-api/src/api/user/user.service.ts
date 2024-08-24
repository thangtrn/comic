import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { User } from '~/schemas/user.schema';
import { RegisterDto } from '~/api/auth/dtos/register.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import removeNullUndefinedFields from '~/utils/removeNullUndefinedFields';

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
    const { password, ...userWithoutPassword } = (await this.userModel.create(user)).toJSON();
    return userWithoutPassword;
  }

  async findUserById(_id: Types.ObjectId | string) {
    return await this.userModel.findById(_id).select('-password');
  }

  async update(user: UpdateUserDto) {
    const { _id, ...userWithoutId } = user;
    const doc = await this.userModel
      .findByIdAndUpdate(
        _id,
        {
          $set: removeNullUndefinedFields(userWithoutId),
        },
        { new: true },
      )
      .select('-password');

    if (!doc) {
      throw new NotFoundException('Not found user with _id = ' + doc._id);
    }

    return doc;
  }
}
