/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;
}

/**
 * Represents a user entity in the application.
 * @remarks
 * This model maps to the `users` table in the database and includes
 * fields for first name, last name, email, password, and image URL.
 * @example
 * ```typescript
 * const user = await User.create({
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securepassword',
 *   image_url: 'https://example.com/avatar.jpg'
 * });
 * ```
 */