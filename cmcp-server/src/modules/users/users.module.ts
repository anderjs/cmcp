/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersProvider } from 'src/providers/users';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/User';

@Module({
  exports: [...UsersProvider],
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService, ...UsersProvider],
})
export class UsersModule {}
