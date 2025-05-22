/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';

import { Genre } from 'src/models/Genre';
import { GENRES } from '../entities';

export const GenreProvider: Provider[] = [
  {
    provide: GENRES,
    useValue: Genre,
  },
];
