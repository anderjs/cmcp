/* eslint-disable prettier/prettier */
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Book } from './Book';

@Table({ tableName: 'authors', timestamps: true })
export class Author extends Model {
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Book)
  books: Book[];
}

/**
 * Represents an author entity in the database.
 * @remarks
 * This model maps to the 'authors' table and includes a one-to-many relationship with the {@link Book} model.
 * @property name - The name of the author.
 * @property books - The list of books written by the author.
 */
