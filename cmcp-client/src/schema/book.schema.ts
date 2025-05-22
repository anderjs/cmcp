/**
 * Zod schema for validating book search.
 * 
 * - `book`: Must be a valid book name.
 * 
 * @see https://zod.dev/
 */
import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string()
});

export const bookFormSchema = z.object({
  title: z.string().min(3, { message: "Book's name should contain at least 4 character(s)"}),
  price: z.number().refine(value => value > 10, { message: "Book's price should be greather than 10$"}),
  genre: z.string(),
  author: z.string(),
  publisher: z.string(),
  file: z.instanceof(File, { message: "Book's should attach an image"}).nullable().optional()
});

export type BookSchema = z.infer<typeof bookSchema>;

export type IBookForm = z.infer<typeof bookFormSchema>;