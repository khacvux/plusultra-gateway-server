export class RemoveImagesEvent {
  constructor(
    private readonly productId: number,
    private readonly imageIds: string[],
    private readonly sellerId: number,
  ) {}
}
