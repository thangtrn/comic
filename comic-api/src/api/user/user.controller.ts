import { UserService } from '~/api/user/user.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import { Public } from '~/shared/decorators/public';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/test')
  @Public()
  test(@Req() req: Request) {
    req.user;
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    return { user: req.user, ip, userAgent };
  }
}
