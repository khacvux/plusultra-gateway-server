import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { S3ServiceModule } from './s3-service/s3-service.module';
import { PostEngagementModule } from './post-engagement/post-engagement.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    S3ServiceModule,
    AuthModule,
    PostModule,
    // S3ServiceModule,
    PostEngagementModule,
    CloudinaryModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RoleGuard,
  //   },
  // ],
})
export class AppModule {}
