import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CommentPostDto } from './dto/comment-post';
import { PostEngagementService } from './post-engagement.service';
import { IResLikePost } from './response-types';
import { AuthGuard } from '../auth/guard';
import { UpdateCommentDto } from './dto';

@UseGuards(AuthGuard)
@Controller('api/post')
export class PostEngagementController {
  constructor(private readonly postEngagementService: PostEngagementService) {}

  @HttpCode(HttpStatus.OK)
  @Delete('comment/:id/delele')
  deleteComment(
    @Param('id', ParseIntPipe) commentId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.postEngagementService.deleteComment(commentId, userId);
  }

  @Put('comment/:id/update')
  updateComment(
    @Param('id', ParseIntPipe) commentId: number,
    @GetUser('sub') userId: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.postEngagementService.updateComment(
      commentId,
      userId,
      dto.newComment,
    );
  }

  @Get('comment/:id/likes')
  likesOfComment(@Param('id', ParseIntPipe) commentId: number) {
    return this.postEngagementService.getCommentLikes(commentId);
  }

  @Patch('comment/:id/like')
  likeComment(
    @Param('id', ParseIntPipe) commentId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.postEngagementService.likeComment(commentId, userId);
  }

  @Patch(':id/like')
  likePost(
    @Param('id', ParseIntPipe) postId: number,
    @GetUser('sub') userId: number,
  ): IResLikePost {
    return this.postEngagementService.likePost({ postId, userId });
  }

  @Post(':id/comment')
  createComment(
    @Body() dto: CommentPostDto,
    @Param('id', ParseIntPipe) postId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.postEngagementService.comment(dto, userId, postId);
  }
}
