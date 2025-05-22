/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';

import { AuditLog } from 'src/models/Audit';
import { AUDIT } from '../entities';

export const AuditProvider: Provider[] = [
  {
    provide: AUDIT,
    useValue: AuditLog,
  },
];
