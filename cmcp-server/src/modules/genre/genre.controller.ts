/* eslint-disable prettier/prettier */
import { ApiResponse } from '@nestjs/swagger';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Genre } from 'src/models/Genre';
import { GenreService } from './genre.service';
import { ErrorInterceptor } from 'src/interceptors/error';
import { ResponseInterceptor } from 'src/interceptors/response';

import { FindAll } from './genre.docs';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  @ApiResponse({
    type: FindAll,
  })
  async findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }
}
