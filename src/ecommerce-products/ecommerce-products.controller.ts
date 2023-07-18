import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
  ParseIntPipe,
  Get,
  UseInterceptors,
  UploadedFiles,
  Req,
  Put,
} from '@nestjs/common';
import { EcommerceProductsService } from './ecommerce-products.service';
import {
  AddProductDto,
  CreateDiscountDto,
  RemoveProductImageDto,
  UpdateDiscountDto,
  UpdateProductDto,
} from './dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { AuthGuard } from '../auth/guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/ec/product')
export class EcommerceProductsController {
  constructor(private readonly ecService: EcommerceProductsService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 9 }]))
  create(
    @UploadedFiles()
    files: {
      mediaFile?: Express.Multer.File[];
    },
    @Body() dto: AddProductDto,
    @GetUser('sub') userId: number,
  ) {
    return this.ecService.create(dto, userId, files);
  }

  @Get(':id')
  getbyId(@Param('id', ParseIntPipe) id: number) {
    return this.ecService.getProductById(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/delete')
  deleteProduct(
    @Param('id', ParseIntPipe) productId: number,
    @GetUser() user: { userId: number; roleId: number },
  ) {
    return this.ecService.delete(productId, user.userId, user.roleId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/update')
  updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: UpdateProductDto,
    @GetUser('sub') userId: number,
  ) {
    return this.ecService.update(productId, dto, userId);
  }

  @UseGuards(AuthGuard)
  @Post(':id/image/upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 9 }]))
  uploadImage(
    @Param('id', ParseIntPipe) productId: number,
    @GetUser('sub') userId: number,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
  ) {
    return this.ecService.uploadProductImage(files, userId, productId);
  }

  @Delete(':id/image')
  removeImage(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: RemoveProductImageDto,
    @GetUser('sub') sellerId: number,
  ) {
    return this.ecService.removeProductImage(productId, dto, sellerId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/update/quantity/:quantity')
  updateQuantity(
    @Param('id', ParseIntPipe) productId: number,
    @Param('quantity', ParseIntPipe) quantity: number,
    @GetUser('sub') userId: number,
  ) {
    return this.ecService.updateInventory(productId, quantity, userId);
  }

  @UseGuards(AuthGuard)
  @Post(':id/new-discount')
  createDiscount(
    @Param('id', ParseIntPipe) productId: number,
    @GetUser('sub') userId: number,
    @Body() dto: CreateDiscountDto,
  ) {
    return this.ecService.createDiscount(productId, userId, dto);
  }

  @UseGuards(AuthGuard)
  @Put(':pid/discount/:did')
  updateDiscount(
    @Param('pid', ParseIntPipe) productId: number,
    @Param('did', ParseIntPipe) discountId: number,
    @GetUser('sub') userId: number,
    @Body() dto: UpdateDiscountDto,
  ) {
    return this.ecService.updateDiscount(productId, discountId, userId, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':pid/discount/:did')
  deleteDiscount(
    @Param('pid', ParseIntPipe) productId: number,
    @Param('did', ParseIntPipe) discountId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.ecService.deleteDiscount(userId, productId, discountId);
  }

  // @UseGuards(AuthGuard)
  // @Patch(':pid/discount/:did')
  // changeDiscountActive(
  //   @Param('pid', ParseIntPipe) productId: number,
  //   @Param('did', ParseIntPipe) discountId: number,
  //   @GetUser('sub') userId: number,
  // ) {
  //   return this.ecService.changeDiscountActive(userId, productId, discountId);
  // }
}
