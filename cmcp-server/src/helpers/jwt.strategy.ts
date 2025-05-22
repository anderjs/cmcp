/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/models/User';

/**
 * @see https://docs.nestjs.com/techniques/authentication
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly jwt: JwtService) {
    super({
      secretOrKey: '::secret::',
      ignoreExpiration: false,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public validate(request: Request) {
    const jwt = request.headers.authorization;

    if (jwt) {
      const token = jwt.split(' ')[1];

      const user = this.jwt.decode(token);

      return user as Partial<User>;
    }

    throw new UnauthorizedException('No Token Provided');
  }
}