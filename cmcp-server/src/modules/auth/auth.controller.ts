/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';

import { Public } from 'src/decorators/public';
import { ErrorInterceptor } from 'src/interceptors/error';
import { ResponseInterceptor } from 'src/interceptors/response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async login(@Body() data: LoginDTO) {
    const user = await this.authService.authenticate(data);

    return {
      token: user
    };
  }
}
