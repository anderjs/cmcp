/* eslint-disable prettier/prettier */
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/models/User';
import { USERS } from 'src/providers/entities';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS)
    private Users: typeof User,
  ) {}

  public async findByEmail(email: string) {
    try {
      const user = await this.Users.findOne<User>({
        where: {
          email,
        },
      });

      return user?.dataValues as User;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
