export class DeleteCommentEvent {
    constructor(
      public readonly userId: number,
      public readonly commentId: number,
    ) {}
  }
  