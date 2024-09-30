import { CookieOptions, Response } from 'express';
import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user';
import { GoogleUser } from './interfaces';

export const expiresTimeTokenMilliseconds = 7 * 24 * 60 * 60 * 1000;

export const COOKIE_NAMES = {
  JWT: 'jwt',
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signInWithGoogle(
    user: GoogleUser,
    res: Response,
  ): Promise<{
    encodedUser: string;
  }> {
    if (!user) throw new BadRequestException('Unauthenticated');

    const existingUser = await this.findUserByEmail(user.email);
    if (!existingUser) throw new BadRequestException('User not found');

    const encodedUser = this.encodeUserDataAsJwt(existingUser);

    this.setJwtTokenToCookies(res, existingUser);

    return {
      encodedUser,
    };
  }

  private async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).lean().exec();
    if (!user) return null;

    return user;
  }

  private async registerGoogleUser(res: Response, user: GoogleUser) {
    try {
      const fullName =
        !user.firstName && !user.lastName
          ? user.email
          : `${user.lastName || ''} ${user.firstName || ''}`.trim();

      const newUser = await this.userModel.create({
        email: user.email,
        fullName,
        picture: user.picture,
        google: {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        },
      });

      const encodedUser = this.encodeUserDataAsJwt(newUser);

      this.setJwtTokenToCookies(res, newUser);

      return {
        encodedUser,
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  private encodeUserDataAsJwt(user: User) {
    delete user.password;

    return this.jwtService.sign({ ...user });
  }

  private setJwtTokenToCookies(res: Response, user: User) {
    const expirationDateInMilliseconds =
      new Date().getTime() + expiresTimeTokenMilliseconds;
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      expires: new Date(expirationDateInMilliseconds),
    };

    res.cookie(
      COOKIE_NAMES.JWT,
      this.jwtService.sign({
        id: user.id,
        sub: {
          email: user.email,
        },
      }),
      cookieOptions,
    );
  }
}
