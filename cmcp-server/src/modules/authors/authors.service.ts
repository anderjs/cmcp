/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Author } from 'src/models/Author';
import { AUTHOR } from 'src/providers/entities';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject(AUTHOR)
    private Authors: typeof Author,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.Authors.findAll<Author>();
  }
}
