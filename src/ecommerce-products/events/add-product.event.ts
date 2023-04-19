import IMedia from 'src/s3-service/types/media.type';

export class AddProductEvent {
  constructor(
    private readonly sellerId: number,
    private readonly name: string,
    private readonly desc: string,
    private readonly price: number,
    private readonly moneyType: number,
    private readonly category: number[],
    private readonly inventory: number,
    private readonly images: IMedia[],
  ) {}
}
