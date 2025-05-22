/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherProvider } from 'src/providers/publisher';
import { PublisherController } from './publisher.controller';

@Module({
  exports: [PublisherService, ...PublisherProvider],
  providers: [PublisherService, ...PublisherProvider],
  controllers: [PublisherController],
})
export class PublisherModule {}
