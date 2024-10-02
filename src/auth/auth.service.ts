import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user';
import { GoogleUser } from './interfaces';

export const expiresTimeTokenMilliseconds = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signInWithGoogle(user: GoogleUser): Promise<{
    encodedUser: string;
  }> {
    if (!user) throw new BadRequestException('Unauthenticated');

    const existingUser = await this.findUserByEmail(user.email);
    if (!existingUser) throw new BadRequestException('User not found');

    const encodedUser = this.encodeUserDataAsJwt(existingUser);

    return {
      encodedUser,
    };
  }

  private async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).lean().exec();
    if (!user) return null;

    return user;
  }

  private encodeUserDataAsJwt(user: User) {
    delete user.password;

    return this.jwtService.sign({ ...user });
  }
}
