import { Inject, Injectable } from '@nestjs/common';
import {
  AddProductDto,
  CreateDiscountDto,
  RemoveProductImageDto,
  UpdateDiscountDto,
  UpdateProductDto,
} from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AddProductEvent,
  GetProductEvent,
  UpdateInventoryEvent,
  UpdateProductEvent,
  DeleteProductEvent,
  SaveProductImageEvent,
  CreateDiscountEvent,
  UpdateDiscountEvent,
  DeleteDiscountEvent,
  ChangeDiscountActiveEvent,
} from './events';
import IMedia from 'src/s3-service/types/media.type';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { RemoveImagesEvent } from './events/remove-images.event';

@Injectable()
export class EcommerceProductsService {
  constructor(
    @Inject('ECOMMERCE_PRODUCTS')
    private readonly eprodsClient: ClientProxy,
    private cloudinary: CloudinaryService,
  ) {}
  async create(
    dto: AddProductDto,
    userId: number,
    files?: { mediaFile?: Express.Multer.File[] },
  ) {
    let images: IMedia[];
    if (files?.mediaFile.length) {
      images = await Promise.all(
        files.mediaFile.map(async (file) => {
          // return await this.s3Instance.uploadFile(file);
          return this.cloudinary.uploadImage(file);
        }),
      );
    }
    return await firstValueFrom(
      this.eprodsClient.send(
        'add_product',
        new AddProductEvent(
          userId,
          dto.name,
          dto.desc,
          dto.price,
          dto.moneyType,
          dto.category,
          dto.inventory,
          images,
        ),
      ),
    );
  }

  async uploadProductImage(
    files: { image?: Express.Multer.File[] },
    userId: number,
    productId: number,
  ) {
    try {
      let images: IMedia[];
      if (files?.image?.length) {
        images = await Promise.all(
          files.image.map(async (file) => {
            return this.cloudinary.uploadImage(file);
          }),
        );
      }
      return await firstValueFrom(
        this.eprodsClient.send(
          'save_product_images',
          new SaveProductImageEvent(images, productId, userId),
        ),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProductImage(
    productId: number,
    dto: RemoveProductImageDto,
    sellerId: number,
  ) {
    try {
      await firstValueFrom(
        this.eprodsClient.send(
          'remove_product_images',
          new RemoveImagesEvent(productId, dto.imageIds, sellerId),
        ),
      );
      dto.imageIds.map(async (id) => {
        await this.cloudinary.removeImage(id);
      });
      return {
        message: 'removed',
      };
    } catch (error) {
      return new Error(error);
    }
  }

  async update(productId: number, dto: UpdateProductDto, sellerId: number) {
    try {
      return await firstValueFrom(
        this.eprodsClient.send(
          'update_product',
          new UpdateProductEvent(
            productId,
            sellerId,
            dto.name,
            dto.desc,
            dto.price,
            dto.moneyType,
            dto.category,
            dto.inventory,
          ),
        ),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(productId: number, sellerId: number, roleId: number) {
    try {
      return firstValueFrom(
        this.eprodsClient.send(
          'delete_product',
          new DeleteProductEvent(productId, sellerId, roleId),
        ),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateInventory(productId: number, quantity: number, sellerId: number) {
    return await firstValueFrom(
      this.eprodsClient.send(
        'update_inventory',
        new UpdateInventoryEvent(productId, quantity, sellerId),
      ),
    );
  }

  async getProductById(productId: number) {
    return await firstValueFrom(
      this.eprodsClient.send('get_product', new GetProductEvent(productId)),
    );
  }

  async createDiscount(
    productId: number,
    userId: number,
    dto: CreateDiscountDto,
  ) {
    return await firstValueFrom(
      this.eprodsClient.send(
        'create_discount',
        new CreateDiscountEvent(
          userId,
          productId,
          dto.name,
          dto.startDate,
          dto.endDate,
          dto.discount_percent,
          dto.desc,
        ),
      ),
    );
  }

  async updateDiscount(
    productId: number,
    discountId: number,
    userId: number,
    dto: UpdateDiscountDto,
  ) {
    return await firstValueFrom(
      this.eprodsClient.send(
        'update_discount',
        new UpdateDiscountEvent(
          userId,
          productId,
          discountId,
          dto.name,
          dto.startDate,
          dto.endDate,
          dto.discount_percent,
          dto.desc,
        ),
      ),
    );
  }

  async deleteDiscount(userId: number, productId: number, discountId: number) {
    return await firstValueFrom(
      this.eprodsClient.send(
        'delete_discount',
        new DeleteDiscountEvent(userId, productId, discountId),
      ),
    );
  }

  // async changeDiscountActive(
  //   userId: number,
  //   productId: number,
  //   discountId: number,
  // ) {
  //   return await firstValueFrom(
  //     this.eprodsClient.send(
  //       'change_discount_active',
  //       new ChangeDiscountActiveEvent(userId, productId, discountId),
  //     ),
  //   );
  // }
}
