/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Index,
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  BeforeSync,
} from 'sequelize-typescript';
import { Genre } from './Genre';
import { Author } from './Author';
import { Publisher } from './Publisher';

@Table({
  tableName: 'books',
  indexes: [
    { fields: ['title'] },
    { fields: ['genreId'] },
    { fields: ['authorId'] },
    { fields: ['available'] },
    { fields: ['publisherId'] },
  ],
  paranoid: true,
  timestamps: true,
})
export class Book extends Model {
  @Index
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.FLOAT)
  price: number;

  @Column(DataType.BOOLEAN)
  available: boolean;

  @Column(DataType.STRING)
  image_url: string;

  @BelongsTo(() => Genre)
  genre: Genre;

  @BelongsTo(() => Author)
  author: Author;

  @BelongsTo(() => Publisher)
  publisher: Publisher;

  @ForeignKey(() => Author)
  @Column
  authorId: number;

  @ForeignKey(() => Genre)
  @Column
  genreId: number;

  @ForeignKey(() => Publisher)
  @Column
  publisherId: number;

  @BeforeSync
  static async addTrgmIndex(instance: typeof Book) {
    await instance?.sequelize?.query(`
      CREATE EXTENSION IF NOT EXISTS pg_trgm;
      CREATE INDEX IF NOT EXISTS books_title_trgm_idx
      ON "books" USING gin ("title" gin_trgm_ops);
    `);
  }
}

/**
 * Represents a Book entity in the system.
 * @remarks
 * This model maps to the 'books' table in the database and includes
 * associations to Genre, Author, and Publisher entities.
 * @property {string} title - The title of the book.
 * @property {number} price - The price of the book.
 * @property {boolean} available - Indicates if the book is available.
 * @property {string} image_url - The URL of the book's image.
 * @property {Genre} genre - The genre associated with the book.
 * @property {Author} author - The author of the book.
 * @property {Publisher} publisher - The publisher of the book.
 * @property {number} authorId - The foreign key referencing the author.
 * @property {number} genreId - The foreign key referencing the genre.
 * @property {number} publisherId - The foreign key referencing the publisher.
 * @example
 * const book = await Book.create({
 *   title: 'Example Book',
 *   price: 19.99,
 *   available: true,
 *   image_url: 'http://example.com/image.jpg',
 *   authorId: 1,
 *   genreId: 2,
 *   publisherId: 3
 * });
 */
