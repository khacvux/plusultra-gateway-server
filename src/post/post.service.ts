import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { S3InstanceService } from 'src/s3-service/s3-service.service';
import IMedia from 'src/s3-service/types/media.type';

// import { S3InstanceService } from 'src/s3-service/s3-service.service';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostEvent } from './events/create-post.event';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST') private readonly postClient: ClientProxy,
    private s3Instance: S3InstanceService,
  ) {}

  async create(
    dto: CreatePostDto,
    files: { mediaFile?: Express.Multer.File[] },
    userId: number,
  ) {
    const mediaFiles: IMedia[] = await Promise.all(
      files.mediaFile.map(async (file) => {
        return await this.s3Instance.uploadFile(file);
      }),
    );
    return await firstValueFrom(
      this.postClient.send(
        'create_post',
        new CreatePostEvent(dto.caption, userId, mediaFiles),
      ),
    );
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
