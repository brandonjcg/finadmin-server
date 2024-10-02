import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard, JwtGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  async googleAuth(@Req() _req) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google-auth-redirect')
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { encodedUser } = await this.authService.signInWithGoogle(req.user);

    return res.redirect(
      `${process.env.GOOGLE_REDIRECT_URL_CLIENT_REACT}?jwtUser=${encodedUser}`,
    );
  }

  @UseGuards(JwtGuard)
  @Get('protected-route')
  async protectedAuthRoute() {}
}
