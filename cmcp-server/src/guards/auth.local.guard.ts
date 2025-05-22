/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

/**
 * Guard that uses the 'local' authentication strategy.
 * 
 * This guard is intended to be used with routes that require local authentication,
 * typically using username and password. It extends the built-in `AuthGuard` from
 * `@nestjs/passport` and specifies the 'local' strategy.
 *
 * @see https://docs.nestjs.com/security/authentication
 */