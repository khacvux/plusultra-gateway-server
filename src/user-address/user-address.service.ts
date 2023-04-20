import { Inject, Injectable } from '@nestjs/common';
import { CreateUserAddressDto, UpdateUserAddressDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserAddressEvent, UpdateUserAddressEvent } from './events';
import { DeleteUserAddressEvent } from './events/delete-user-address.event';

@Injectable()
export class UserAddressService {
  constructor(
    @Inject('USER_ADDRESS_SERVICE')
    private readonly userAddressClient: ClientProxy,
  ) {}

  async create(userId: number, dto: CreateUserAddressDto) {
    return await firstValueFrom(
      this.userAddressClient.send(
        'create_user_address',
        new CreateUserAddressEvent(
          userId,
          dto.address,
          dto.city,
          dto.postalCode,
          dto.country,
          dto.telephone,
        ),
      ),
    );
  }

  async update(id: number, userId: number, dto: UpdateUserAddressDto) {
    return await firstValueFrom(
      this.userAddressClient.send(
        'update_address_user',
        new UpdateUserAddressEvent(
          id,
          userId,
          dto.address,
          dto.city,
          dto.postalCode,
          dto.country,
          dto.telephone,
        ),
      ),
    );
  }

  async remove(id: number, userId: number) {
    return await firstValueFrom(
      this.userAddressClient.send(
        'update_address_user',
        new DeleteUserAddressEvent(id, userId),
      ),
    );
  }
}
