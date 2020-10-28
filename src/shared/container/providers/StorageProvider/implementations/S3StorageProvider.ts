import upload from '@config/upload';
import fs from 'fs';
import mime from 'mime';
import aws from 'aws-sdk';
import path from 'path';
import StorageInterface from '../models/StorageInterface';

export default class S3StorageProvider implements StorageInterface {
  private client: aws.S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tempPath, file);

    if (!originalPath) {
      throw new Error('File not found');
    }
    const mimeType = mime.getType(originalPath);

    if (!mimeType) {
      throw new Error('Mime type not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: 'gobarber-app-storage',
        Key: file,
        ACL: 'public-read',
        ContentType: mimeType,
        ContentDisposition: `inline; filename=${file}`,
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'gobarber-app-storage',
        Key: file,
      })
      .promise();
  }
}
