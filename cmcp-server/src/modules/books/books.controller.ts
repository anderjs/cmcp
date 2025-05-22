/* eslint-disable prettier/prettier */
import {
  Put,
  Get,
  Post,
  Body,
  Query,
  Param,
  Logger,
  Controller,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { BooksService } from './books.service';
import { ErrorInterceptor } from 'src/interceptors/error';
import { ResponseInterceptor } from 'src/interceptors/response';
import {
  createBook,
  FindBookDTO,
  updateBook,
  UpdateBookDTO,
  type CreateBookDTO,
  type FindBooksDTO,
} from './books.dto';

import { storage } from 'src/helpers/disk.storage';
import { type Token, User } from 'src/decorators/user';

@Controller('books')
export class BooksController {
  private readonly logger = new Logger(BooksController.name);

  constructor(private readonly booksService: BooksService) {}

  @Get()
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async findAll(@Query() query: FindBooksDTO) {
    this.logger.log('::findAll');

    return await this.booksService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async findOne(@Param() { id }: FindBookDTO) {
    this.logger.log('::findAll');

    return await this.booksService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async createBook(
    @User() user: Token,
    @Body() data: CreateBookDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.logger.log('::createBook');

    const { error, success } = createBook.safeParse(data);

    if (success && file) {
      return await this.booksService.createBook(data, file.filename, user);
    }

    throw new BadRequestException(error ?? 'Not File Attached');
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async updateBook(
    @User() user: Token,
    @Body() data: UpdateBookDTO,
    @Param() { id }: { id: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.logger.log('::updateBok');

    const { error, success } = updateBook.safeParse(data);

    if (success) {
      return await this.booksService.updateBook(+id, data, file?.filename, user);
    }

    throw new BadRequestException(error ?? 'Not File Attached');
  }

  @Delete(':id')
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async deleteBook(
    @User() user: Token,
    @Param() { id }: { id: string },
  ) {
    this.logger.log('::deleteBook');

    return await this.booksService.deleteBook(+id, user);
  }
}
