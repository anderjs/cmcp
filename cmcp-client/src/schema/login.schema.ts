/**
 * Zod schema for validating login form data.
 * 
 * - `email`: Must be a valid email address.
 * - `password`: Must be a string with a minimum length of 8 characters.
 * 
 * @see https://zod.dev/
 */
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchema>;