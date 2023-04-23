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
import { EcommerceCartService } from './cart.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from 'src/auth/guard';

@UseGuards(AuthGuard)
@Controller('ec/cart')
export class EcommerceCartController {
  constructor(private readonly ecommerceCartService: EcommerceCartService) {}

  @Post('add')
  create(@Body() dto: CreateCartItemDto, @GetUser('sub') userId: number) {
    return this.ecommerceCartService.create(userId, dto);
  }

  @Get()
  findAll(@GetUser('sub') userId: number) {
    return this.ecommerceCartService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('sub') userId: number,
  ) {
    return this.ecommerceCartService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @GetUser('sub') userId: number,
    @Param('id', ParseIntPipe) cartItemId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.ecommerceCartService.update(userId, cartItemId, dto);
  }

  @Delete(':id')
  delete(
    @GetUser('sub') userId: number,
    @Param('id', ParseIntPipe) cartItemId: number,
  ) {
    return this.ecommerceCartService.delete(userId, cartItemId);
  }
}
