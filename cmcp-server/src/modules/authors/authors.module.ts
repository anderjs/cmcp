import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorProvider } from 'src/providers/author';

@Module({
  exports: [AuthorsService, ...AuthorProvider],
  providers: [AuthorsService, ...AuthorProvider],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
