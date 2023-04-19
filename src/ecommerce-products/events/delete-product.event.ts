export class DeleteProductEvent {
  constructor(
    private readonly productId: number,
    private readonly sellerId: number,
    private readonly roleId: number,
  ) {}
}
