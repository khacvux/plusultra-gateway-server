import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, retry } from 'rxjs';
// import { S3InstanceService } from 'src/s3-service/s3-service.service';
import IMedia from 'src/s3-service/types/media.type';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeleteMediaFileEvent, UpdatePostEvent } from './events';
import { OwnerCheckEvent } from './events/check-owner.event';
import { CreatePostEvent } from './events/create-post.event';
import { DeletePostEvent } from './events/delete-post.event';
import {
  DeleteMediaFailException,
  DeletePostFailException,
  PermissionException,
} from './exceptions';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST') private readonly postClient: ClientProxy,
    @Inject('AUTHENTICATION')
    private readonly authClient: ClientProxy,
    // private s3Instance: S3InstanceService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    dto: CreatePostDto,
    userId: number,
    files?: { mediaFile?: Express.Multer.File[] },
  ) {
    let mediaFiles: IMedia[];
    if (files.mediaFile.length) {
      mediaFiles = await Promise.all(
        files.mediaFile.map(async (file) => {
          // return await this.s3Instance.uploadFile(file);
          return this.cloudinary.uploadImage(file);
        }),
      );
    }

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

  async postComments(postId: number) {
    return await firstValueFrom(this.postClient.send('post_comments', postId));
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const permission = await this._ownerCheck(id, userId);
    if (!permission) throw new PermissionException();
    return await firstValueFrom(
      this.postClient.send(
        'update_post_caption',
        new UpdatePostEvent(updatePostDto.caption, id),
      ),
    );
  }

  async deleteMedia(userId: number, postId: number, fileKey: string) {
    const permission = await this._ownerCheck(postId, userId);
    if (!permission) throw new PermissionException();
    try {
      // await this.s3Instance.deleteFile(fileKey);
      await this.cloudinary.removeImage(fileKey);
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

  async remove(id: number, userId: number) {
    const permission = await this._ownerCheck(id, userId);
    if (!permission) throw new PermissionException();
    try {
      return await firstValueFrom(
        this.postClient.send('delete_post', new DeletePostEvent(id)),
      );
    } catch {
      throw new DeletePostFailException();
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
