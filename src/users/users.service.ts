import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/create-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDTO: CreateUserDto): Promise<User> {
    return this.userModel.create({
      ...userDTO,
    });
  }
  async findOne(username: string) {
    return await this.userModel.findOne({ username }).lean();
  }
}
