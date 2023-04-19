export class UpdateDiscountEvent {
    constructor(
      private readonly userId: number,
      private readonly productId: number,
      private readonly discountId: number,
      private readonly name: string,
      private readonly startDate: Date,
      private readonly endDate: Date,
      private readonly discount_percent: number,
      private readonly desc: string,
    ) {}
  }
  