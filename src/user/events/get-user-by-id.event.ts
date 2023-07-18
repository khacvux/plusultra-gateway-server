export class GetUserByIdEvent {
  constructor(private readonly userId: number, private readonly id: number) {}
}
