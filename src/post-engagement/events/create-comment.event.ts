export class CreateCommentEvent {
  constructor(
    public readonly comment: string,
    public readonly userId: number,
    public readonly postId: number,
  ) {}
}
