/**
 * Custom React hook for handling authentication logic.
 *
 * Provides a `login` mutation using React Query's `useMutation` hook,
 * which wraps the `loginService` function. The mutation can be used to
 * perform user login operations and manage their state (loading, error, etc.).
 *
 * @returns An object containing the `login` mutation.
 *
 * @example
 * const { login } = useAuth();
 * login.mutate({ username: 'user', password: 'pass' });
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import { BooksQueryKey } from "@src/query";

import * as booksService from "@src/services/books";
import type { IBookForm } from "@src/schema/book.schema";
import useQueryStore from "@src/store/query";

export default function useBooks() {
  const fetchBooks = useQuery({
    queryKey: [BooksQueryKey.BOOKS],
    queryFn: async () => {
      const { books } = useQueryStore.getState();

      const query = books[BooksQueryKey.BOOKS];

      return booksService.fetchBooks(query);
    },
  });

  const fetchBook = useQuery({
    queryKey: [BooksQueryKey.FIND_BOOK],
    queryFn: async () => {
      const { books } = useQueryStore.getState();

      const book = books[BooksQueryKey.FIND_BOOK] as Record<string, number>;

      return booksService.fetchBook(book.id);
    },
  });

  const createBook = useMutation({
    mutationKey: [BooksQueryKey.CREATE_BOOK],
    mutationFn: async (book: IBookForm) => {
      return booksService.createBook(book);
    },
  });

  const updateBook = useMutation({
    mutationKey: [BooksQueryKey.UPDATE_BOOK],
    mutationFn: async (book: IBookForm & { id: number }) => {
      const { id, ...data } = book;

      return booksService.updateBook(id, data);
    },
  });


   const deleteBook = useMutation({
    mutationKey: [BooksQueryKey.DELETE_BOOK],
    mutationFn: async (id: number) => {
      return booksService.deleteBook(id);
    },
  });


  return {
    fetchBook,
    updateBook,
    createBook,
    fetchBooks,
    deleteBook,
  };
}
