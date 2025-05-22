/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';

import { User } from 'src/models/User';
import { USERS } from '../entities';

export const UsersProvider: Provider[] = [
  {
    provide: USERS,
    useValue: User,
  },
];
