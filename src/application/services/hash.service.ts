export abstract class HashService {
  abstract hash(value: string): Promise<string>;
  abstract matches(raw: string, hashed: string): Promise<boolean>;
}
