export class UpdateInventoryEvent {
  constructor(
    private readonly productId: number,
    private readonly quantity: number,
    private readonly sellerId: number,
  ) {}
}
