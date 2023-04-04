import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, retry } from 'rxjs';
import { S3InstanceService } from 'src/s3-service/s3-service.service';
import IMedia from 'src/s3-service/types/media.type';

// import { S3InstanceService } from 'src/s3-service/s3-service.service';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeleteMediaFileEvent, UpdatePostEvent } from './events';
import { CreatePostEvent } from './events/create-post.event';
import { DeleteMediaFailException } from './exceptions';

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

  async findAllPostOfUser(userId: number) {
    return await firstValueFrom(
      this.postClient.send('all_post_of_user', userId),
    );
  }

  async findPost(id: number) {
    return await firstValueFrom(this.postClient.send('find_post', id));
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await firstValueFrom(
      this.postClient.send(
        'update_post_caption',
        new UpdatePostEvent(updatePostDto.caption, id),
      ),
    );
  }

  async deleteMedia(userId: number, fileKey: string) {
    try {
      await this.s3Instance.deleteFile(fileKey);
      return await firstValueFrom(
        this.postClient.send(
          'delete_media_file',
          new DeleteMediaFileEvent(fileKey),
        ),
      );
    } catch {
      throw new DeleteMediaFailException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
