import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartsService } from './shopping_carts.service';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { RoleEnum } from 'src/common/enums/role.enum';

@ApiBearerAuth()
@Auth([RoleEnum.USER])
@Auth([RoleEnum.ADMIN])
@Auth([RoleEnum.OWNER]) 
@ApiTags('shopping-carts')
@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Post()
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartsService.create(createShoppingCartDto);
  }

  @Get()
  findAll() {
    return this.shoppingCartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.shoppingCartsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartsService.update(id, updateShoppingCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.shoppingCartsService.remove(id);
  }
}
