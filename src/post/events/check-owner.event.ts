export class OwnerCheckEvent {
  constructor(
    public readonly postId: number,
    public readonly authorId: number,
  ) {}
}
