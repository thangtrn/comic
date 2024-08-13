import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '~/api/user/user.service';
import { JwtPayload } from '~/shared/types/jwt-payload.type';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_REFRESH}`,
    });
  }

  async validate(payload: JwtPayload) {
    const doc = await this.userService.findUserById(payload.userId);
    if (!doc) {
      throw new UnauthorizedException();
    }
    const { password, ...user } = doc.toJSON();
    return user;
  }
}
