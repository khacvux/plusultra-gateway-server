export class CreateCartItemEvent {
  constructor(
    private readonly userId: number,
    private readonly productId: number,
    private readonly quantity: number,
  ) {}
}
