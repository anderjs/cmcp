/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/interceptors/response';

export const ResponseProvider: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
];
