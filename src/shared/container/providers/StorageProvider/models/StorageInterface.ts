export default interface StorageInterface {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
