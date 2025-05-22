/* eslint-disable prettier/prettier */
import { Get, Controller, UseInterceptors } from '@nestjs/common';
import { AuthorsService } from './authors.service';

import { Author } from 'src/models/Author';
import { ErrorInterceptor } from 'src/interceptors/error';
import { ResponseInterceptor } from 'src/interceptors/response';


@Controller('authors')
export class AuthorsController {
  constructor(private authors: AuthorsService) {}

  @Get()
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async findAll() : Promise<Author []> {
    return this.authors.findAll();
  }
}
