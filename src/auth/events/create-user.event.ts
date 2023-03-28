export class CreateUserEvent {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstname?: string,
    public readonly lastname?: string,
  ) {}
}
