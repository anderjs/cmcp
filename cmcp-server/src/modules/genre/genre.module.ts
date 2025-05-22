/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreProvider } from 'src/providers/genres';

@Module({
  exports: [GenreService, ...GenreProvider],
  providers: [GenreService, ...GenreProvider],
  controllers: [GenreController],
})
export class GenreModule {}
