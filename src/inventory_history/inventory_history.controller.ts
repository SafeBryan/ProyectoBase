import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InventoryHistoryService } from './inventory_history.service';
import { CreateInventoryHistoryDto } from './dto/create-inventory_history.dto';
import { UpdateInventoryHistoryDto } from './dto/update-inventory_history.dto';
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
@Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
@ApiTags('inventory-history')
@Controller('inventory-history')
export class InventoryHistoryController {
  constructor(
    private readonly inventoryHistoryService: InventoryHistoryService,
  ) {}

  @Post()
  @ApiBody({
    description: 'Create inventory history record',
    type: CreateInventoryHistoryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Inventory history record created successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createInventoryHistoryDto: CreateInventoryHistoryDto) {
    return this.inventoryHistoryService.create(createInventoryHistoryDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieve all inventory history records.',
  })
  findAll() {
    return this.inventoryHistoryService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the inventory history record',
  })
  @ApiResponse({
    status: 200,
    description: 'Inventory history record details.',
  })
  @ApiResponse({
    status: 404,
    description: 'Inventory history record not found.',
  })
  findOne(@Param('id') id: number) {
    return this.inventoryHistoryService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the inventory history record to update',
  })
  @ApiBody({
    description: 'Updated inventory history record details',
    type: UpdateInventoryHistoryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Inventory history record updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Inventory history record not found.',
  })
  update(
    @Param('id') id: number,
    @Body() updateInventoryHistoryDto: UpdateInventoryHistoryDto,
  ) {
    return this.inventoryHistoryService.update(id, updateInventoryHistoryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the inventory history record to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Inventory history record removed successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Inventory history record not found.',
  })
  remove(@Param('id') id: number) {
    return this.inventoryHistoryService.remove(id);
  }
}
