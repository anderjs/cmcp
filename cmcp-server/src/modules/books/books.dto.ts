/* eslint-disable prettier/prettier */
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const findBook = z.object({
  id: z.coerce.number(),
});

export const findBooks = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  title: z.string().optional(),
  genre: z.coerce.number().optional(),
  author: z.coerce.number().optional(),
  publisher: z.coerce.number().optional(),
});

export const createBook = z.object({
  title: z.string(),
  genre: z.string(),
  author: z.string(),
  publisher: z.string(),
  price: z.coerce.number(),
});

export const updateBook = z.object({
  title: z.string(),
  genre: z.string(),
  author: z.string(),
  publisher: z.string(),
  price: z.coerce.number(),
});


export class FindBookDTO extends createZodDto(findBook) {}

export class FindBooksDTO extends createZodDto(findBooks) {}

export class CreateBookDTO extends createZodDto(createBook) {}

export class UpdateBookDTO extends createZodDto(createBook) {}

/**
 * Zod schema for finding a single book by its ID.
 */

/**
 * Zod schema for querying multiple books with pagination and optional filters.
 *
 * @property page - The page number for pagination.
 * @property limit - The number of items per page.
 * @property title - (Optional) Filter by book title.
 * @property genre - (Optional) Filter by book genre.
 * @property author - (Optional) Filter by book author.
 * @property publisher - (Optional) Filter by book publisher.
 */

/**
 * Zod schema for creating a new book.
 *
 * @property title - The title of the book.
 * @property genre - The genre of the book.
 * @property author - The author of the book.
 * @property publisher - The publisher of the book.
 * @property price - The price of the book.
 */

/**
 * DTO for finding a single book, validated by the `findBook` Zod schema.
 */

/**
 * DTO for querying multiple books, validated by the `findBooks` Zod schema.
 */

/**
 * DTO for creating a new book, validated by the `createBook` Zod schema.
 */
