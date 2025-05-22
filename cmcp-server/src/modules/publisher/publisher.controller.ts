/* eslint-disable prettier/prettier */
import { Get, Controller, UseInterceptors } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { Publisher } from 'src/models/Publisher';
import { ErrorInterceptor } from 'src/interceptors/error';
import { ResponseInterceptor } from 'src/interceptors/response';

@Controller('publisher')
export class PublisherController {
  constructor(private publisherService: PublisherService) {}

  @Get()
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async findAll(): Promise<Publisher[]> {
    return await this.publisherService.findAll();
  }
}
