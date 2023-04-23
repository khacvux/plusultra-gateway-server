export class GetCartItemEvent {
  constructor(
    private readonly userId: number,
    private readonly cartItemId: number,
  ) {}
}
