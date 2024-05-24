export class ResourceNotFound extends Error {
  constructor(
    public readonly resourceName: string,
    public readonly criteria?: any,
  ) {
    super('RESOURCE_NOT_FOUND');
  }
}
