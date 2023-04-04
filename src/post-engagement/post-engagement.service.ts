import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostEngagementDto } from './dto/create-post-engagement.dto';
import { UpdatePostEngagementDto } from './dto/update-post-engagement.dto';

@Injectable()
export class PostEngagementService {
  constructor(
    @Inject("POST_ENGAGEMENT")
    private readonly postEngagementClient: ClientProxy,
  ) {}

  create(createPostEngagementDto: CreatePostEngagementDto) {
    return 'This action adds a new postEngagement';
  }

  findAll() {
    return `This action returns all postEngagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postEngagement`;
  }

  update(id: number, updatePostEngagementDto: UpdatePostEngagementDto) {
    return `This action updates a #${id} postEngagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} postEngagement`;
  }
}
