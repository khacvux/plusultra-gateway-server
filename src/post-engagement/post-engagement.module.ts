import { Module } from '@nestjs/common';
import { PostEngagementService } from './post-engagement.service';
import { PostEngagementController } from './post-engagement.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_ENGAGEMENT',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
      {
        name: 'POST',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [PostEngagementController],
  providers: [PostEngagementService],
})
export class PostEngagementModule {}
