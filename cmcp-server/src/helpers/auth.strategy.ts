/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// - Srvice
import { AuthService } from 'src/modules/auth/auth.service';

/**
 * @see https://docs.nestjs.com/techniques/authentication
 */

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(email: string, password: string) {
    return this.service.authenticate({
      email,
      password,
    });
  }
}
