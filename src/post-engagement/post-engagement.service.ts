import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { first, firstValueFrom } from 'rxjs';
import { LikePostDto, UpdateCommentDto } from './dto';
import { CommentPostDto } from './dto/comment-post';
import {
  DeleteCommentEvent,
  GetCommentLikesEvent,
  LikeCommentEvent,
  LikePostEvent,
  UpdateCommentEvent,
} from './events';
import { CreateCommentEvent } from './events/create-comment.event';
import { IResLikePost } from './response-types';
import { OwnerCheckEvent } from 'src/post/events/check-owner.event';
import { PermissionException } from 'src/post/exceptions';

@Injectable()
export class PostEngagementService {
  constructor(
    @Inject('POST_ENGAGEMENT')
    private readonly postEngagementClient: ClientProxy,
    @Inject('POST')
    private readonly postClient: ClientProxy,
    @Inject('AUTHENTICATION')
    private readonly authClient: ClientProxy,
  ) {}

  async likePost(payload: LikePostDto): Promise<IResLikePost> {
    return await firstValueFrom(
      this.postClient.send(
        'like_post',
        new LikePostEvent(payload.userId, payload.postId),
      ),
    );
  }

  async comment(payload: CommentPostDto, userId: number, postId: number) {
    return await firstValueFrom(
      this.postClient.send(
        'create_comment',
        new CreateCommentEvent(payload.comment, userId, postId),
      ),
    );
  }

  async deleteComment(commentId: number, userId: number) {
    return await firstValueFrom(
      this.postClient.send(
        'delete_comment',
        new DeleteCommentEvent(userId, commentId),
      ),
    );
  }

  async updateComment(commentId: number, userId: number, newComment: string) {
    return await firstValueFrom(
      this.postClient.send(
        'update_comment',
        new UpdateCommentEvent(userId, commentId, newComment),
      ),
    );
  }

  async likeComment(commentId: number, userId: number) {
    try {
      return await firstValueFrom(
        this.postClient.send(
          'like_comment',
          new LikeCommentEvent(commentId, userId),
        ),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCommentLikes(commentId: number) {
    try {
      return await firstValueFrom(
        this.postClient.send(
          'get_comment_likes',
          new GetCommentLikesEvent(commentId),
        ),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async _ownerCheck(postId: number, userId: number) {
    try {
      return await firstValueFrom(
        this.authClient.send(
          'owner_check',
          new OwnerCheckEvent(postId, userId),
        ),
      );
    } catch {
      throw new PermissionException();
    }
  }
}
