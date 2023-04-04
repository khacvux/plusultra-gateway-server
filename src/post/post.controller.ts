import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard, Permission } from '../auth/guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/auth/types';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'mediaFile', maxCount: 5 }]))
  create(
    @UploadedFiles()
    files: {
      mediaFile?: Express.Multer.File[];
    },
    @Body() dto: CreatePostDto,
    @GetUser() userId: number,
  ) {
    return this.postService.create(dto, files, userId);
  }

  @Get('/user/:uid')
  findAllPostOfuser(@Param('uid', ParseIntPipe) userId: number) {
    return this.postService.findAllPostOfUser(userId);
  }

  @Get(':id')
  findPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findPost(id);
  }

  @Post(':id/update')
  updatePostCaption(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() userId: number,
  ) {
    return this.postService.update(+id, updatePostDto, userId);
  }

  @Delete(':id/media/:mid/delete')
  deleteMedia(
    @Param('id', ParseIntPipe) id: number,
    @Param('mid') mid: string,
    @GetUser() userId: number,
  ) {
    return this.postService.deleteMedia(userId, id, mid);
  }

  @Delete(':id/delete')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() userId: number) {
    return this.postService.remove(+id, userId);
  }
}
