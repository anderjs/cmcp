/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { AuditProvider } from 'src/providers/audit';
import { UsersProvider } from 'src/providers/users';
import { BooksProvider } from 'src/providers/books';

@Module({
  exports: [AuditService, ...AuditProvider, ...UsersProvider, ...BooksProvider],
  providers: [AuditService, ...AuditProvider, ...UsersProvider, ...BooksProvider],
  controllers: [AuditController],
})
export class AuditModule {}
