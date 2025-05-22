/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComboboxData } from "@mantine/core";
import type { IFetch, IFetchPagination } from "@src/types/common";
import type { UseQueryResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export function paginate<T>(
  data: UseQueryResult<AxiosResponse<IFetchPagination<T>, any>, Error>
) {
  return data?.data?.data?.response;
}

export function normalize<T>(
  data: UseQueryResult<AxiosResponse<IFetch<T>, any>, Error>
) {
  return data?.data?.data?.response;
}

export function getQueryData<T>({
  data,
}: UseQueryResult<AxiosResponse<IFetch<T>, any>, Error>) {
  return data?.data?.response;
}

export function transform<T>(data: T[], label: keyof T, value: keyof T) {
  return data.map((obj) => ({
    label: obj[label],
    value: `${obj[value]}`,
  })) as ComboboxData;
}

export const toUSD = (value: number) => {
  const USD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  }).format(value);

  return USD;
};

export const filterParams = ({ ...params }: Record<string, unknown>) => {
  Object.keys(params).forEach((key) => {
    if (params[key] === "") {
      delete params[key];
    }
  });

  return { ...params };
};
