/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Providers } from 'src/database/providers';

@Module({
  exports: [...Providers],
  providers: [...Providers],
})
export class DatabaseModule {}
