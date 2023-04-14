import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get<string>('CLOUNDINARY_NAME'),
      api_key: config.get<string>('CLOUNDINARY_API_KEY'),
      api_secret: config.get<string>('CLOUNDINARY_API_SECRET'),
    });
  }

  uploadImage(file: Express.Multer.File): Promise<{
    url?: string;
    keyFile?: string;
  }> {
    try {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          (error, result: { secure_url: string; public_id: string }) => {
            if (error) return reject(error);
            resolve({ url: result.secure_url, keyFile: result.public_id });
          },
        );
        toStream(file.buffer).pipe(upload);
      });
    } catch (error) {
      return error;
    }
  }

  removeImage(publicID: string) {
    try {
      return cloudinary.uploader.destroy(publicID);
    } catch (error) {
      return error;
    }
  }
}
