import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from '@aws-sdk/client-s3';
import IMedia from './types/media.type';

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

  async uploadFile(file) {
    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      file.originalname,
      file.mimetype,
    );
  }

  async s3_upload(
    file: File,
    bucket: string,
    name: string,
    mimetype: string,
  ): Promise<IMedia> {
    const keyFile = `${Date.now()}${String(name)}`;
    const params = {
      Bucket: bucket,
      Key: keyFile,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
    };
    try {
      await this.s3Instance.putObject(params);
      return {
        keyFile,
        mediaUrl: `https://${bucket}.s3.${this.AWS_S3_REGION}.amazonaws.com/${keyFile}`,
      };
    } catch (error) {
      throw new Error('Image not saved in s3!');
    }
  }

  async getLinkMediaKey() {}
}
