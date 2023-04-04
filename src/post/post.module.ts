import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { S3ServiceModule } from 'src/s3-service/s3-service.module';


@Module({
  imports: [
    NestjsFormDataModule,
    S3ServiceModule,
    ClientsModule.register([
      {
        name: process.env.POST_SERVICE,
        transport: Transport.TCP,
        options: { port: +process.env.POST_SERVICE_PORT },
      },
      {
        name: process.env.AUTHENTICATION_SERVICE,
        transport: Transport.TCP,
        options: { port: +process.env.AUTHENTICATION_SERVICE_PORT },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
