import { create } from "zustand";
import { AuditQueryKey, BooksQueryKey } from "@src/query";

type QueryArgs = Record<string, unknown>;

type BooksState = {
  [BooksQueryKey.BOOKS]: QueryArgs;
  [BooksQueryKey.FIND_BOOK]: QueryArgs;
  [BooksQueryKey.CREATE_BOOK]: QueryArgs;
  [BooksQueryKey.DELETE_BOOK]: QueryArgs;
};

type AuditState = {
  [AuditQueryKey.LOG]: QueryArgs;
  [AuditQueryKey.LOGS]: QueryArgs;
  [AuditQueryKey.AUDIT]: QueryArgs;
};

type State = {
  logs: AuditState;
  books: BooksState;
};

type Actions = {
  clear: () => void;
  setQueryArgs: <T extends keyof BooksState>(
    key: T,
    value: Partial<BooksState[T]>
  ) => void;
  setAuditArgs: <T extends keyof AuditState>(
    key: T,
    value: Partial<AuditState[T]>
  ) => void;
};

const useQueryStore = create<State & Actions>((set) => ({
  books: {
    [BooksQueryKey.BOOKS]: {},
    [BooksQueryKey.FIND_BOOK]: {},
    [BooksQueryKey.CREATE_BOOK]: {},
    [BooksQueryKey.DELETE_BOOK]: {},
  },
  logs: {
    [AuditQueryKey.LOG]: {},
    [AuditQueryKey.LOGS]: {},
    [AuditQueryKey.AUDIT]: {},
  },
  clear: () =>
    set(() => ({
      books: {
        [BooksQueryKey.BOOKS]: {},
        [BooksQueryKey.FIND_BOOK]: {},
        [BooksQueryKey.CREATE_BOOK]: {},
        [BooksQueryKey.DELETE_BOOK]: {},
      },
      logs: {
        [AuditQueryKey.LOG]: {},
        [AuditQueryKey.LOGS]: {},
        [AuditQueryKey.AUDIT]: {},
      },
    })),
  setQueryArgs: (key, args) =>
    set((state) => ({
      books: {
        ...state.books,
        [key]: {
          ...state.books[key],
          ...args,
        },
      },
    })),
  setAuditArgs: (key, args) =>
    set((state) => ({
      logs: {
        ...state.logs,
        [key]: {
          ...state.logs[key],
          ...args,
        },
      },
    })),
}));

export default useQueryStore;
