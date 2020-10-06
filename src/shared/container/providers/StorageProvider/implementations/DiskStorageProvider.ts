import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import fs from 'fs';
import path from 'path';
import StorageInterface from '../models/StorageInterface';

export default class DiskStorageProvider implements StorageInterface {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tempPath, file),
      path.resolve(upload.uploadsPath, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.uploadsPath, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      throw new AppError(`file does not exists in path ${filePath}.`, 500);
    }
    await fs.promises.unlink(filePath);
  }
}
