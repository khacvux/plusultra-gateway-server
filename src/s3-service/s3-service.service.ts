import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommandInput,
  PutObjectCommandInput,
  PutObjectCommandInputType,
  S3,
} from '@aws-sdk/client-s3';
import IMedia from './types/media.type';
import { ok } from 'assert';

@Injectable()
export class S3InstanceService {
  constructor(private readonly config: ConfigService) {}

  AWS_S3_BUCKET = this.config.get('AWS_S3_BUCKET');
  AWS_S3_REGION = this.config.get('AWS_S3_REGION');
  AWS_S3_ACCESS_KEY = this.config.get('AWS_S3_ACCESS_KEY');
  AWS_S3_SECRET_KEY = this.config.get('AWS_S3_SECRET_KEY');

  s3Instance = new S3({
    region: this.AWS_S3_REGION,
    credentials: {
      accessKeyId: this.AWS_S3_ACCESS_KEY,
      secretAccessKey: this.AWS_S3_SECRET_KEY,
    },
  });

  async uploadFile(file: Express.Multer.File | any) {
    const keyFile = `${Date.now()}${String(file.originalname)}`;

    return await this.s3UploadObject({
      Bucket: this.AWS_S3_BUCKET,
      Key: keyFile,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.minetype,
    });
  }

  async deleteFile(fileKey: string) {
    return await this.s3DeleteObject({
      Bucket: this.AWS_S3_BUCKET,
      Key: fileKey,
    });
  }

  async s3UploadObject(params: PutObjectCommandInput): Promise<IMedia> {
    try {
      await this.s3Instance.putObject(params);
      return {
        keyFile: params.Key,
        mediaUrl: `https://${params.Bucket}.s3.${this.AWS_S3_REGION}.amazonaws.com/${params.Key}`,
      };
    } catch (error) {
      throw new Error('Image not saved in s3!');
    }
  }

  async s3DeleteObject(params: DeleteObjectCommandInput) {
    try {
      await this.s3Instance.deleteObject(params);
      return { message: 'deleted' };
    } catch (error) {
      throw new Error('Image has not been deleted in s3!');
    }
  }

  async getLinkMediaKey() {}
}
