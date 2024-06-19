import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { RoleEnum } from 'src/common/enums/role.enum';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
  @ApiBody({ description: 'Create a new product', type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth([RoleEnum.USER])
  @ApiResponse({ status: 200, description: 'Retrieve all products.' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Auth([RoleEnum.USER])
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the product',
  })
  @ApiResponse({ status: 200, description: 'Product details.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the product to update',
  })
  @ApiBody({ description: 'Updated product details', type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the product to delete',
  })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
