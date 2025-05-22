/* eslint-disable prettier/prettier */
import type { Request } from 'express';
import { User as IUser } from 'src/models/User';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type Token = Pick<
  IUser,
  'id' | 'email' | 'name'
>;

export const User = createParamDecorator(
  (data: keyof Token, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request?.user as IUser;

    return data ? (user?.[data] as unknown) : user;
  },
);