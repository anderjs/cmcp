/* eslint-disable prettier/prettier */
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Book } from './Book';

@Table({ tableName: 'genres', timestamps: true })
export class Genre extends Model {
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Book)
  books: Book[];
}

/**
 * Represents a genre of books in the system.
 * @remarks
 * This model maps to the `genres` table in the database and includes
 * a one-to-many relationship with the {@link Book} model.
 * @example
 * ```typescript
 * const genre = await Genre.create({ name: 'Science Fiction' });
 * ```
 * @property name - The name of the genre.
 * @property books - The list of books associated with this genre.
 */