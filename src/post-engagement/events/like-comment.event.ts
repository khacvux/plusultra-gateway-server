export class LikeCommentEvent {
  constructor(
    private readonly commentId: number,
    private readonly userId: number,
  ) {}
}
