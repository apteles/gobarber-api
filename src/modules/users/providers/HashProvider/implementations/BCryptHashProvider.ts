import { hash, compare } from 'bcryptjs';
import HashInterface from '../models/HashInterface';

export default class BCryptHashProvider implements HashInterface {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
