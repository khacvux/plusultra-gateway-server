export class DeleteUserAddressEvent {
  constructor(private readonly id: number, private readonly userId: number) {}
}
