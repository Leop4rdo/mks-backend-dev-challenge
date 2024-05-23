export abstract class HashService {
  abstract hash(value: string): Promise<string>;
}
