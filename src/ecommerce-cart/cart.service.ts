import { Inject, Injectable } from '@nestjs/common';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { first, firstValueFrom } from 'rxjs';
import {
  CreateCartItemEvent,
  DeleteCartItemEvent,
  GetCartItemEvent,
  UpdateCartItemEvent,
} from './events';

@Injectable()
export class EcommerceCartService {
  constructor(@Inject('EC_CART') private cartClient: ClientProxy) {}

  async create(userId: number, dto: CreateCartItemDto) {
    return await firstValueFrom(
      this.cartClient.send(
        'create_cart_item',
        new CreateCartItemEvent(userId, dto.productId, dto.quantity),
      ),
    );
  }

  async findAll(userId: number) {
    return await firstValueFrom(this.cartClient.send('get_cart', { userId }));
  }

  async findOne(id: number, userId: number) {
    return await firstValueFrom(
      this.cartClient.send('get_cart_item', new GetCartItemEvent(userId, id)),
    );
  }

  async update(userId: number, cartItemId: number, dto: UpdateCartItemDto) {
    return await firstValueFrom(
      this.cartClient.send(
        'update_cart_item',
        new UpdateCartItemEvent(userId, cartItemId, dto.quantity),
      ),
    );
  }

  async delete(userId: number, cartItemId: number) {
    return await firstValueFrom(
      this.cartClient.send(
        'delete_cart_item',
        new DeleteCartItemEvent(userId, cartItemId),
      ),
    );
  }
}
