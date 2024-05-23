export class DuplicateResourceError extends Error {
  constructor(
    public readonly resourceName: string,
    public readonly criteria?: any,
  ) {
    super('DUPLICATE_RESOURCE');
  }
}
