import { type IFetch, type IPublisher } from "@src/types/common";
import httpClient from "@src/utils/http";

export const fetchPublishers = () => {
  return httpClient.get<IFetch<IPublisher []>>("/api/v1/publisher");
};
