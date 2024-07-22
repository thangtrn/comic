import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import LocalAuthGuard from './guards/local.guard';
import JwtAuthGuard from './guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
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

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Get('/private')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async private(@Req() req: Request) {
    console.log('🚀 ~ AuthController ~ private ~ req:', req.user);

    return 'private';
  }
}
