import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
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
@ApiTags('order-items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  @ApiBody({ description: 'Create a new order item', type: CreateOrderItemDto })
  @ApiResponse({ status: 201, description: 'Order item created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all order items.' })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the order item',
  })
  @ApiResponse({ status: 200, description: 'Order item details.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  findOne(@Param('id') id: number) {
    return this.orderItemsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the order item to update',
  })
  @ApiBody({
    description: 'Updated order item details',
    type: UpdateOrderItemDto,
  })
  @ApiResponse({ status: 200, description: 'Order item updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  update(
    @Param('id') id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the order item to delete',
  })
  @ApiResponse({ status: 200, description: 'Order item removed successfully.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  remove(@Param('id') id: number) {
    return this.orderItemsService.remove(id);
  }
}
