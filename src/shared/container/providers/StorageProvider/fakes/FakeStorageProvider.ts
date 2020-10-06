import StorageInterface from '../models/StorageInterface';

export default class FakeStorageProvider implements StorageInterface {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      currentFile => currentFile === file,
    );
    this.storage.splice(findIndex, 1);
  }
}
