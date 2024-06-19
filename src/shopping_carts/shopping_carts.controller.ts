import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShoppingCartsService } from './shopping_carts.service';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
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
@Auth([RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.OWNER])
@ApiTags('shopping-carts')
@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Post()
  @ApiBody({
    description: 'Create a shopping cart',
    type: CreateShoppingCartDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Shopping cart created successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartsService.create(createShoppingCartDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all shopping carts.' })
  findAll() {
    return this.shoppingCartsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the shopping cart',
  })
  @ApiResponse({ status: 200, description: 'Shopping cart details.' })
  @ApiResponse({ status: 404, description: 'Shopping cart not found.' })
  findOne(@Param('id') id: number) {
    return this.shoppingCartsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the shopping cart to update',
  })
  @ApiBody({
    description: 'Updated shopping cart details',
    type: UpdateShoppingCartDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Shopping cart updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Shopping cart not found.' })
  update(
    @Param('id') id: number,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    return this.shoppingCartsService.update(id, updateShoppingCartDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the shopping cart to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Shopping cart deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Shopping cart not found.' })
  remove(@Param('id') id: number) {
    return this.shoppingCartsService.remove(id);
  }
}
