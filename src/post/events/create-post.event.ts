import IMedia from 'src/s3-service/types/media.type';

export class CreatePostEvent {
  constructor(
    public readonly caption: string,
    public readonly authorId: number,
    public readonly mediaFiles: IMedia[] | any,
  ) {}
}
