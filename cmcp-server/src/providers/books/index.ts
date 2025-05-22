/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';

import { Book } from 'src/models/Book';
import { BOOKS } from '../entities';

export const BooksProvider: Provider[] = [
  {
    provide: BOOKS,
    useValue: Book,
  },
];
