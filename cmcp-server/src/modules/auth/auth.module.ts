/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/helpers/jwt.strategy';
import { LocalStrategy } from 'src/helpers/auth.strategy';
import { UsersProvider } from 'src/providers/users';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '::secret::',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [
    JwtService,
    JwtStrategy,
    AuthService,
    UsersService,
    LocalStrategy,
    ...UsersProvider,
  ],
  exports: [...UsersProvider],
  controllers: [AuthController],
})
export class AuthModule {}
