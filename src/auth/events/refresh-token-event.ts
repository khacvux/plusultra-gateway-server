export class RefreshTokenEvent {
  constructor(
    public readonly refreshToken: string,
    public readonly userId: number,
  ) {}
}
