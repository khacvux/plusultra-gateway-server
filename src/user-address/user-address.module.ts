import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: 'USER_ADDRESS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3005 },
      },
    ]),
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService],
})
export class UserAddressModule {}
