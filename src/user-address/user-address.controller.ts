import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { CreateUserAddressDto, UpdateUserAddressDto } from './dto';
import { AuthGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(AuthGuard)
@Controller('api/user/address')
export class UserAddressController {
  constructor(private readonly service: UserAddressService) {}

  @Post('create')
  create(@GetUser('sub') userId: number, @Body() dto: CreateUserAddressDto) {
    return this.service.create(userId, dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('sub') userId: number,
    @Body() dto: UpdateUserAddressDto,
  ) {
    return this.service.update(id, userId, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('sub') userId: number,
  ) {
    return this.service.remove(id, userId);
  }
}
