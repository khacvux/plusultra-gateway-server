import IMedia from 'src/s3-service/types/media.type';

export class CreatePostEvent {
  constructor(
    public readonly caption: string,
    public readonly authorId: number,
  ) {}
}

export class SavePostPhotosEvent {
  constructor(
    public readonly postId: number,
    public readonly mediaFiles: IMedia[] | any,
  ) {}
}
