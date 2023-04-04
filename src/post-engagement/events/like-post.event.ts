export class LikePostEvent {
  constructor(public readonly userId: number, public readonly postId: number) {}
}
