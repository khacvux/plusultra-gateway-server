export class DeleteCartItemEvent {
  constructor(
    private readonly userId: number,
    private readonly cartItemId: number,
  ) {}
}
