/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";

import type { LoginDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private users: UsersService,
  ) {}

  public async authenticate({ email, password }: LoginDTO) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const match =  bcrypt.compareSync(password, user.password)


    if (!match) {
      throw new UnauthorizedException();
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...data } = user;

    return await this.jwt.signAsync(data, {
      secret: '::secret::',
    });
  }
}
