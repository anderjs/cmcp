export type IFetch<T> = {
  response: T;
  status: number;
  message: string;
};

export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  iat: number;
}

export interface IBook {
  id: number;
  price: number;
  title: string;
  genre: IGenre;
  author: IAuthor;
  publisher: IPublisher;
}

export type IFetchPagination<T> = {
  response: {
    data: T;
    page: number;
    limit: number;
    total: number;
  };
  status: number;
  message: string;
};

export interface IAuthor {
  id: number;
  name: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IPublisher {
  id: number;
  name: string;
}

export interface AuditLog {
  id: number;
  user: IUser;
  action: string;
  userId: number;
  entity: string;
  metadata: string;
  createdAt: string;
  updatedAt: string;
  type: ActionType;
}

export enum ActionType {
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  CREATE = "CREATE",
}
