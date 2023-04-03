import { Module } from '@nestjs/common';
import { S3InstanceService } from './s3-service.service';


@Module({
  providers: [S3InstanceService],
  exports: [S3InstanceService]
})
export class S3ServiceModule {}
