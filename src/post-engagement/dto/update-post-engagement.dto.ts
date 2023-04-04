import { PartialType } from '@nestjs/mapped-types';
import { CreatePostEngagementDto } from './create-post-engagement.dto';

export class UpdatePostEngagementDto extends PartialType(CreatePostEngagementDto) {}
