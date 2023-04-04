export class UpdatePostEvent {
  constructor(
    public readonly caption: string,
    public readonly postId: number,
  ) {}
}
