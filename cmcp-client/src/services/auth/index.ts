import httpClient from "@src/utils/http";
import type { IFetch } from "@src/types/common";

type LoginPayload = IFetch<{
  token: string;
}>

export const loginService = (data: { email: string; password: string }) => {
  return httpClient.post<LoginPayload>("/api/v1/auth/login", data);
};
