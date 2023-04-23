import { Module } from '@nestjs/common';
import { EcommerceCartService } from './cart.service';
import { EcommerceCartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EC_CART',
        transport: Transport.TCP,
        options: { port: 3006 },
      },
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [EcommerceCartController],
  providers: [EcommerceCartService],
})
export class EcommerceCartModule {}
