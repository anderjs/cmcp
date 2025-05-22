/* eslint-disable prettier/prettier */
export const AUDIT = "AUDIT_REPOSITORY";

export const USERS = "USERS_REPOSITORY";

export const BOOKS = 'BOOKS_REPOSITORY';

export const AUTHOR = "AUTHOR_REPOSITORY";

export const GENRES = "GENRES_REPOSITORY";

export const PUBLISHER = "PUBLISHER_REPOSITORY";

export { AuditProvider } from "./audit";
export { BooksProvider } from './books';
export { UsersProvider } from "./users";
export { GenreProvider } from "./genres";
export { AuthorProvider } from "./author";
export { PublisherProvider } from "./publisher";