export default interface HashInterface {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hash: string): Promise<boolean>;
}
