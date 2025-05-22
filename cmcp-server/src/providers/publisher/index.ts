/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';

import { Publisher } from 'src/models/Publisher';
import { PUBLISHER } from '../entities';

export const PublisherProvider: Provider[] = [
  {
    provide: PUBLISHER,
    useValue: Publisher,
  },
];
