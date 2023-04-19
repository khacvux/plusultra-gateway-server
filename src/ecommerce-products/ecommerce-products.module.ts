import { Module } from '@nestjs/common';
import { EcommerceProductsService } from './ecommerce-products.service';
import { EcommerceProductsController } from './ecommerce-products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ECOMMERCE_PRODUCTS',
        transport: Transport.TCP,
        options: { port: 3004 },
      },
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [EcommerceProductsController],
  providers: [EcommerceProductsService],
})
export class EcommerceProductsModule {}
