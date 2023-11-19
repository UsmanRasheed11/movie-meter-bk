// /src/modules/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async seedUsers(users: any[]) {
    return this.userModel.create(users);
  }

  async findByUsername(username: string): Promise<User> {
    return (await this.userModel.findOne({ username }).exec()).toJSON();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await (await this.userModel.findById(userId).exec()).toJSON();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: any): Promise<User> {
    return this.userModel.create(data);
  }

  async changePassword(userId: string, newPassword: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = newPassword;
    return user.save();
  }
}
