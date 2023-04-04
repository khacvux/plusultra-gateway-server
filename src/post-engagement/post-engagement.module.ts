import { Module } from '@nestjs/common';
import { PostEngagementService } from './post-engagement.service';
import { PostEngagementController } from './post-engagement.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.POST_ENGAGEMENT_SERVICE,
        transport: Transport.TCP,
        options: { port: +process.env.POST_ENGAGEMENT_SERVICE_PORT },
      },
    ]),
  ],
  controllers: [PostEngagementController],
  providers: [PostEngagementService],
})
export class PostEngagementModule {}
