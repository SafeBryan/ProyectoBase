import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';
@ApiBearerAuth()
@Auth([RoleEnum.USER])
@ApiTags('cart-items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartItemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemsService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cartItemsService.remove(id);
  }
}
