/* eslint-disable prettier/prettier */
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Book } from './Book';

@Table({ tableName: 'publishers', timestamps: true })
export class Publisher extends Model {
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Book)
  books: Book[];
}

/**
 * Represents a publisher entity in the system.
 * @remarks
 * This model maps to the 'publishers' table in the database and includes
 * a one-to-many relationship with the {@link Book} model.
 * @property name - The name of the publisher.
 * @property books - The list of books published by this publisher.
 */