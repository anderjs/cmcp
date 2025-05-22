/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';

import { Author } from 'src/models/Author';
import { AUTHOR } from '../entities';

export const AuthorProvider: Provider[] = [
  {
    provide: AUTHOR,
    useValue: Author,
  },
];
