import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { S3ServiceModule } from './s3-service/s3-service.module';
import { PostEngagementModule } from './post-engagement/post-engagement.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EcommerceProductsModule } from './ecommerce-products/ecommerce-products.module';
import { UserAddressModule } from './user-address/user-address.module';
import { EcommerceCartModule } from './ecommerce-cart/cart.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    S3ServiceModule,
    CloudinaryModule,
    AuthModule,
    PostModule,
    PostEngagementModule,
    EcommerceProductsModule,
    UserAddressModule,
    EcommerceCartModule,
  ],
})
export class AppModule {}
