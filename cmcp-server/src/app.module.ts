/* eslint-disable prettier/prettier */

/**
 * The root module of the application.
 * @module AppModule
 * @remarks
 * This module imports and configures all the necessary modules for the application,
 * including configuration management, database connection via Sequelize, and feature modules
 * such as authentication, books, genres, authors, and publishers.
 * @imports
 * - ConfigModule: Loads environment variables and configuration.
 * - SequelizeModule: Sets up the PostgreSQL database connection and registers models.
 * - AuthModule, BooksModule, GenreModule, AuthorsModule, PublisherModule: Feature modules.
 * @providers
 * - AppService, AuthService, BooksService, GenreService, PublisherService: Application services.
 * @controllers
 * - AppController, AuthController, BooksController, GenreController, AuthorsController, PublisherController: Application controllers.
 */
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

// Import the ConfigModule from the config directory
import config from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

import { User } from './models/User';
import { Book } from './models/Book';
import { Genre } from './models/Genre';
import { Author } from './models/Author';
import { AuditLog } from './models/Audit';
import { Publisher } from './models/Publisher';

import { BooksModule } from './modules/books/books.module';
import { BooksService } from './modules/books/books.service';
import { BooksController } from './modules/books/books.controller';

import { GenreModule } from './modules/genre/genre.module';
import { GenreService } from './modules/genre/genre.service';
import { GenreController } from './modules/genre/genre.controller';

import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';

import { AuthorsModule } from './modules/authors/authors.module';
import { AuthorsService } from './modules/authors/authors.service';
import { AuthorsController } from './modules/authors/authors.controller';

import { PublisherModule } from './modules/publisher/publisher.module';
import { PublisherService } from './modules/publisher/publisher.service';
import { PublisherController } from './modules/publisher/publisher.controller';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '1d',
      },
      secret: '::secret::',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: () => ({
        port: 5432,
        host: 'postgres',
        dialect: 'postgres',
        username: 'fastapi',
        database: 'fastapi',
        password: 'fastapi',
        models: [Book, User, Genre, Author, AuditLog, Publisher],
      }),
    }),
    HttpModule,
    AuthModule,
    UsersModule,
    BooksModule,
    GenreModule,
    AuthorsModule,
    TerminusModule,
    DatabaseModule,
    PublisherModule,
    AuditModule,
  ],
  providers: [
    JwtService,
    AppService,
    AuthService,
    BooksService,
    GenreService,
    UsersService,
    AuthorsService,
    PublisherService,
  ],
  controllers: [
    AppController,
    AuthController,
    BooksController,
    GenreController,
    AuthorsController,
    PublisherController,
  ],
})
export class AppModule {}
