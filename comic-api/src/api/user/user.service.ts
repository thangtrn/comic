import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '~/schemas/user.schema';
import { RegisterDto } from '~/api/auth/dtos/register.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async create(user: RegisterDto) {
    return await this.userModel.create(user);
  }
}
