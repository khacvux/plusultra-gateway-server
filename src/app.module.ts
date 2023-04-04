import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { S3ServiceModule } from './s3-service/s3-service.module';
import { PostEngagementModule } from './post-engagement/post-engagement.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    S3ServiceModule,
    NestjsFormDataModule,
    AuthModule,
    PostModule,
    S3ServiceModule,
    PostEngagementModule,
  ],
})
export class AppModule {}
