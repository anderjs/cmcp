import type { IBookForm } from "@src/schema/book.schema";
import type { IBook, IFetch, IFetchPagination } from "@src/types/common";
import { filterParams } from "@src/utils";
import httpClient from "@src/utils/http";

export const fetchBooks = (query: Record<string, unknown>) => {
  return httpClient.get<IFetchPagination<IBook[]>>("/api/v1/books", {
    params: filterParams(query),
  });
};

export const fetchBook = (id: number) => {
  return httpClient.get<IFetch<IBook>>(`/api/v1/books/${id}`);
};

export const createBook = (book: IBookForm) => {
  const data = new FormData();

  if (book.file) {
    data.append("file", book.file);
  }
  data.append("title", book.title);
  data.append("genre", book.genre);
  data.append("author", book.author);
  data.append("price", `${book.price}`);
  data.append("publisher", book.publisher);

  return httpClient.post<IFetch<IBook>>("/api/v1/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const updateBook = (id: number, book: IBookForm) => {
  const data = new FormData();

  if (book.file) {
     data.append("file", book.file);
  }

  data.append("title", book.title);
  data.append("genre", book.genre);
  data.append("author", book.author);
  data.append("price", `${book.price}`);
  data.append("publisher", book.publisher);

  return httpClient.put<IFetch<IBook>>(`/api/v1/books/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const deleteBook = (id: number) => {
  return httpClient.delete<IFetch<IBook>>(`/api/v1/books/${id}`);
};
