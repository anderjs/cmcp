/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Publisher } from 'src/models/Publisher';
import { PUBLISHER } from 'src/providers/entities';

@Injectable()
export class PublisherService {
  constructor(
    @Inject(PUBLISHER)
    private Publishers: typeof Publisher,
  ) {}

  async findAll(): Promise<Publisher[]> {
    return this.Publishers.findAll<Publisher>();
  }
}
