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
  Patch,
  Logger,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  create(@Body() dto: CreatePostDto, @GetUser('sub') userId: number) {
    return this.postService.create(dto, userId);
  }

  @Post(':id/upload/photos')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'mediaFile', maxCount: 5 }]))
  uploadFiles(
    @Param('id', ParseIntPipe) postId: number,
    @UploadedFiles()
    files: {
      mediaFile: Express.Multer.File[];
    },
  ) {
    return this.postService.uploadPhotos(postId, files);
  }

  @Get('/user/:uid/:pag')
  findAllPostOfuser(
    @Param('uid', ParseIntPipe) authorId: number,
    @GetUser('sub') userId: number,
    @Param('pag', ParseIntPipe) pagination: number,
  ) {
    return this.postService.findAllPostOfUser(authorId, userId, pagination);
  }

  @Get('/my/:pag')
  getMyPost(
    @GetUser('sub') userId: number,
    @Param('pag', ParseIntPipe) pagination: number,
  ) {
    return this.postService.findAllPostOfUser(userId, userId, pagination);
  }

  @Get(':id')
  findPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findPost(id);
  }

  @Get('/:id/comments/pag/:pag')
  postComments(
    @Param('id', ParseIntPipe) postId: number,
    @Param('pag', ParseIntPipe) pagination: number,
    @GetUser('sub') userId: number,
  ) {
    return this.postService.postComments({ postId, userId, pagination });
  }

  @Patch(':id/update')
  updatePostCaption(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser('sub') userId: number,
  ) {
    return this.postService.update(+id, updatePostDto, userId);
  }

  @Delete(':id/media/:mid/delete')
  deleteMedia(
    @Param('id', ParseIntPipe) id: number,
    @Param('mid') mid: string,
    @GetUser('sub') userId: number,
  ) {
    return this.postService.deleteMedia(userId, id, mid);
  }

  @Delete(':id/delete')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('sub') userId: number,
  ) {
    return this.postService.remove(+id, userId);
  }
}
