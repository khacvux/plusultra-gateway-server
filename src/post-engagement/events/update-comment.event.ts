export class UpdateCommentEvent {
  constructor(
    private readonly userId: number,
    private readonly commentId: number,
    private readonly newCommnet: string,
  ) {}
}
