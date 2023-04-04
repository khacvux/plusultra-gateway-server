import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CommentPostDto } from './dto/comment-post';
import { PostEngagementService } from './post-engagement.service';
import { IResLikePost } from './response-types';

@Controller('post-engagement')
export class PostEngagementController {
  constructor(private readonly postEngagementService: PostEngagementService) {}

  @Post(':id/like')
  create(
    @Param('id', ParseIntPipe) postId: number,
    @GetUser() userId: number,
  ): IResLikePost {
    return this.postEngagementService.like({ postId, userId });
  }

  @Post(':id/comment')
  findAll(
    @Body() dto: CommentPostDto,
    @Param('id', ParseIntPipe) postId: number,
    @GetUser() userId: number,
  ) {
    return this.postEngagementService.comment(dto, postId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postEngagementService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postEngagementService.remove(+id);
  }
}
