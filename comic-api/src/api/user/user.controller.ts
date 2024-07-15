import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  @Get('/')
  getAllUser() {
    return 'Hello';
  }
}
