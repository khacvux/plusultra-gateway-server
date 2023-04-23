export class UpdateCartItemEvent {
  constructor(
    private readonly userId: number,
    private readonly cartItemId: number,
    private readonly quantity: number,
  ) {}
}
