import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LikePostDto } from './dto';
import { CommentPostDto } from './dto/comment-post';
import { LikePostEvent } from './events';
import { CommentPostEvent } from './events/comment-post.event';
import { IResLikePost } from './response-types';

@Injectable()
export class PostEngagementService {
  constructor(
    @Inject('POST_ENGAGEMENT')
    private readonly postEngagementClient: ClientProxy,
  ) {}

  async like(payload: LikePostDto): Promise<IResLikePost> {
    return await firstValueFrom(
      this.postEngagementClient.send(
        'like_post',
        new LikePostEvent(payload.userId, payload.postId),
      ),
    );
  }

  async comment(payload: CommentPostDto, userId: number, postId: number) {
    return await firstValueFrom(
      this.postEngagementClient.send(
        'comment_post',
        new CommentPostEvent(payload.comment, userId, postId),
      ),
    );
  }

  findAll() {
    return `This action returns all postEngagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postEngagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} postEngagement`;
  }
}
