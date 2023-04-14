import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { S3ServiceModule } from 'src/s3-service/s3-service.module';


@Module({
  imports: [
    // S3ServiceModule,
    ClientsModule.register([
      {
        name: "POST",
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: "AUTHENTICATION",
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
