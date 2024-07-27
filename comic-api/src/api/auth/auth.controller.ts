import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import LocalAuthGuard from './guards/local.guard';
import JwtAuthGuard from './guards/jwt.guard';
import JwtRefreshAuthGuard from './guards/jwt-refresh.guard';
import { LogoutDto } from './dtos/logout.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'thangtrn01@gmail.com',
        },
        password: {
          type: 'string',
          example: 'asdfasdf',
        },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    return await this.authService.login(req.user as any);
  }

  @Post('/register')
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('/logout')
  async logout(@Body() token: LogoutDto) {
    return this.authService.logout(token);
  }

  @Get('/refresh-token')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshAuthGuard)
  async refreshTokens(@Req() req: Request, @Body() token: RefreshTokenDto) {
    const user: any = req.user;
    return await this.authService.refreshTokens(
      user?._id,
      token.oldAccessToken,
    );
  }

  @Get('/private')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async private(@Req() req: Request) {
    return req.user;
  }
}
