import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostEngagementService } from './post-engagement.service';
import { CreatePostEngagementDto } from './dto/create-post-engagement.dto';
import { UpdatePostEngagementDto } from './dto/update-post-engagement.dto';

@Controller('post-engagement')
export class PostEngagementController {
  constructor(private readonly postEngagementService: PostEngagementService) {}

  @Post()
  create(@Body() createPostEngagementDto: CreatePostEngagementDto) {
    return this.postEngagementService.create(createPostEngagementDto);
  }

  @Get()
  findAll() {
    return this.postEngagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postEngagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostEngagementDto: UpdatePostEngagementDto) {
    return this.postEngagementService.update(+id, updatePostEngagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postEngagementService.remove(+id);
  }
}
