import { type IFetch, type IAuthor } from "@src/types/common";
import httpClient from "@src/utils/http";

export const fetchAuthors = () => {
  return httpClient.get<IFetch<IAuthor[]>>("/api/v1/authors");
};
