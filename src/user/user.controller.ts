import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from 'src/auth/guard';

@UseGuards(AuthGuard)
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@GetUser('sub') id: number) {
    return this.userService.findOne({ userId: id, id });
  }

  @Get('/follow')
  getUserFollow(@GetUser('sub') userId: number) {
    return this.userService.getUserFollow({ userId });
  }

  @Get(':id/follow')
  getUserFollowById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getUserFollow({ userId });
  }

  @Get(':id')
  getUserById(
    @Param('id', ParseIntPipe) userId: number,
    @GetUser('sub') id: number,
  ) {
    return this.userService.findOne({ userId, id });
  }
}
