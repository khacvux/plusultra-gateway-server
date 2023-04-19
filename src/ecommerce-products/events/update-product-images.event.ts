import IMedia from 'src/s3-service/types/media.type';

export class SaveProductImageEvent {
  constructor(
    private readonly images: IMedia[],
    private readonly productId: number,
    private readonly userId: number,
  ) {}
}
