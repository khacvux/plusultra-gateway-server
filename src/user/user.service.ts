import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetUserFollow, GetUserByIdEvent } from './events';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  async findOne({ userId, id }: { userId: number; id: number }) {
    return await firstValueFrom(
      this.userClient.send('get_user_by_id', new GetUserByIdEvent(userId, id)),
    );
  }

  async getUserFollow({ userId }: { userId: number }) {
    return await firstValueFrom(
      this.userClient.send('get_user_follow', new GetUserFollow(userId)),
    );
  }
}
