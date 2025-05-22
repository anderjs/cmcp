import { type IFetch, type IGenre } from "@src/types/common";
import httpClient from "@src/utils/http";

export const fetchGenre = () => {
  return httpClient.get<IFetch<IGenre[]>>("/api/v1/genre");
};
