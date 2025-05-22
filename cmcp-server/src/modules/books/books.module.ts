/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';

import { BooksProvider } from 'src/providers/books';
import { AuditProvider } from 'src/providers/audit';
import { GenreProvider } from 'src/providers/genres';
import { AuthorProvider } from 'src/providers/author';
import { PublisherProvider } from 'src/providers/publisher';

@Module({
  exports: [
    BooksService,
    ...BooksProvider,
    ...AuditProvider,
    ...AuthorProvider,
    ...AuthorProvider,
    ...PublisherProvider,
  ],
  providers: [
    BooksService,
    ...BooksProvider,
    ...AuditProvider,
    ...GenreProvider,
    ...AuthorProvider,
    ...PublisherProvider,
  ],
  controllers: [BooksController],
})
export class BooksModule {}
