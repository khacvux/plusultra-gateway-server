export class DeleteDiscountEvent {
  constructor(
    private readonly userId: number,
    private readonly productId: number,
    private readonly discountId: number,
  ) {}
}
