export class UpdateProductEvent {
  constructor(
    private readonly productId: number,
    private readonly sellerId: number,
    private readonly name: string,
    private readonly desc: string,
    private readonly price: number,
    private readonly moneyType: number,
    private readonly category: string,
    private readonly inventory: number,
  ) {}
}
