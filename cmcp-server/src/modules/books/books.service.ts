/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  AUDIT,
  BOOKS,
  GENRES,
  AUTHOR,
  PUBLISHER,
} from 'src/providers/entities';
import { Book } from 'src/models/Book';
import { Genre } from 'src/models/Genre';
import { Author } from 'src/models/Author';
import { AuditLog } from 'src/models/Audit';
import { Publisher } from 'src/models/Publisher';
import { Filterable, FindOptions, Includeable, Op } from 'sequelize';

import { CreateBookDTO, FindBooksDTO, UpdateBookDTO } from './books.dto';

import { Token } from 'src/decorators/user';
import { Sequelize } from 'sequelize-typescript';
import { ActionType } from 'src/types';

@Injectable()
export class BooksService {
  private logger = new Logger();

  constructor(
    @Inject(BOOKS)
    private Books: typeof Book,
    @Inject(GENRES)
    private Genres: typeof Genre,
    @Inject(AUDIT)
    private Audits: typeof AuditLog,
    @Inject(AUTHOR)
    private Authors: typeof Author,
    @Inject(PUBLISHER)
    private Publishers: typeof Publisher,
    private sequelize: Sequelize,
  ) {}

  async findOne(id: number) {
    const book = await this.Books.findOne({
      where: {
        id,
      },
      include: [Genre, Author, Publisher],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book.dataValues as Book;
  }

  async findAll({
    page,
    limit,
    title,
    genre,
    author,
    publisher,
  }: FindBooksDTO) {
    const offset = (page - 1) * limit;

    const where: Filterable<Book>['where'] = {};

    const include: FindOptions<Book>['include'][] = [];

    if (title) {
      where.title = { [Op.iLike]: `%${title}%` };
    }

    if (author) {
      include.push({
        model: Author,
        where: { id: +author },
        required: true,
      });
    } else {
      include.push({ model: Author });
    }

    if (genre) {
      include.push({
        model: Genre,
        where: { id: +genre },
        required: true,
      });
    } else {
      include.push({ model: Genre });
    }

    if (publisher) {
      include.push({
        model: Publisher,
        where: { id: +publisher },
        required: true,
      });
    } else {
      include.push({ model: Publisher });
    }

    const { rows, count } = await this.Books.findAndCountAll({
      where,
      limit,
      offset,
      paranoid: false,
      order: [['createdAt', 'DESC']],
      include: include as Includeable | Includeable[] | undefined,
    });

    return {
      data: rows,
      total: Math.ceil(count / limit),
      page,
      limit,
    };
  }

  async createBook(data: CreateBookDTO, filename: string, user: Token) {
    const transaction = await this.sequelize.transaction();

    try {
      const [author, genre, publisher] = await Promise.all([
        this.Genres.findOne({ where: { name: data.genre }, transaction }),
        this.Authors.findOne({ where: { name: data.author }, transaction }),
        this.Publishers.findOne({
          where: { name: data.publisher },
          transaction,
        }),
      ]);

      if (!genre) throw new NotFoundException('Genre Not Found');
      if (!author) throw new NotFoundException('Author Not Found');
      if (!publisher) throw new NotFoundException('Publisher Not Found');

      const book = await this.Books.create(
        {
          title: data.title,
          price: +data.price,
          genreId: genre?.id,
          authorId: author?.id,
          image_url: filename,
          publisherId: publisher?.id,
        },
        {
          transaction,
        },
      );

      const log = await this.Audits.create(
        {
          action: 'Created a book',
          userId: user.id,
          entityId: book.id,
          metadata: JSON.stringify({
            name: book?.dataValues?.title,
            timestamp: Date.now(),
          }),
          entity: 'Book',
          type: ActionType.CREATE
        },
        {
          transaction,
        },
      );

      await transaction.commit();

      return {
        log,
        book,
      };
    } catch (err) {
      this.logger.error(`${(err as Error).name}`);

      await transaction.rollback();

      throw err;
    }
  }

  async deleteBook(id: number, user: Token) {
    const transaction = await this.sequelize.transaction();

    try {
      const book = await this.Books.findByPk(id, { transaction });

      if (book) {
        await book.destroy({ transaction });

        const log = await this.Audits.create(
          {
            userId: user.id,
            entityId: book.id,
            metadata: JSON.stringify({
              timestamp: Date.now(),
              name: book.dataValues?.title
            }),
            action: "Deleted a book",
            type: ActionType.DELETE,
            entity: 'Book',
          },
          { transaction },
        );

        await transaction.commit();

        return {
          book,
          log,
        };
      }
      throw new NotFoundException('Book not found');
    } catch (err) {
      this.logger.error(`${(err as Error).name}`);

      await transaction.rollback();

      throw err;
    }
  }

  async updateBook(
    id: number,
    data: UpdateBookDTO,
    filename: string,
    user: Token,
  ) {
    const transaction = await this.sequelize.transaction();

    try {
      const book = await this.Books.findByPk(id, { transaction });

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      const author = await this.Authors.findOne({
        where: { name: data.author },
        transaction,
      });

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      const genre = await this.Genres.findOne({
        where: { name: data.genre },
        transaction,
      });
      if (!genre) {
        throw new NotFoundException('Genre not found');
      }

      const publisher = await this.Publishers.findOne({
        where: { name: data.publisher },
        transaction,
      });

      if (!publisher) {
        throw new NotFoundException('Publisher not found');
      }

      await book.update(
        {
          title: data.title,
          price: +data.price,
          authorId: author?.id as number,
          genreId: genre?.id as number,
          publisherId: publisher.id as number,
          ...(filename && { image_url: filename }),
        },
        { transaction },
      );

      const log = await this.Audits.create(
        {
          action: "Update a book",
          type: ActionType.UPDATE,
          userId: user.id,
          entityId: book.id,
          metadata: JSON.stringify({
            name: book?.dataValues?.title,
            timestamp: Date.now(),
          }),
          entity: 'Book',
        },
        { transaction },
      );

      await transaction.commit();

      return {
        book,
        log,
      };
    } catch (err) {
      this.logger.error(`${(err as Error).name}`);
      await transaction.rollback();
      throw err;
    }
  }
}
