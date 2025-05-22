/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Genre } from 'src/models/Genre';
import { GENRES } from 'src/providers/entities';

@Injectable()
export class GenreService {
  constructor(
    @Inject(GENRES)
    private Genres: typeof Genre,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.Genres.findAll<Genre>();
  }
}
