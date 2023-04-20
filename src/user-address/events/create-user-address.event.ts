export class CreateUserAddressEvent {
  constructor(
    private readonly userId: number,
    private readonly address: string,
    private readonly city: string,
    private readonly postalCode: string,
    private readonly country: string,
    private readonly telephone: string,
  ) {}
}
