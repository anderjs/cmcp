/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { Book } from 'src/models/Book';
import { User } from 'src/models/User';
import { Genre } from 'src/models/Genre';
import { Author } from 'src/models/Author';
import { AuditLog } from 'src/models/Audit';
import { Publisher } from 'src/models/Publisher';
import { ConfigService } from '@nestjs/config';

export const Providers: Provider[] = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async () => {
      const sequelize = new Sequelize({
        port: 5432,
        host: 'postgres',
        dialect: 'postgres',
        username: 'fastapi',
        database: 'fastapi',
        password: 'fastapi',
      });

      sequelize.addModels([User, Author, Genre, Book, Publisher, AuditLog]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
