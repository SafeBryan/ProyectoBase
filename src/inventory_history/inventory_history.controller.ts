import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryHistoryService } from './inventory_history.service';
import { CreateInventoryHistoryDto } from './dto/create-inventory_history.dto';
import { UpdateInventoryHistoryDto } from './dto/update-inventory_history.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';
@ApiBearerAuth()
@Auth([RoleEnum.ADMIN])
@Auth([RoleEnum.OWNER]) 
@ApiTags('inventory-history')
@Controller('inventory-history')
export class InventoryHistoryController {
  constructor(private readonly inventoryHistoryService: InventoryHistoryService) {}

  @Post()
  create(@Body() createInventoryHistoryDto: CreateInventoryHistoryDto) {
    return this.inventoryHistoryService.create(createInventoryHistoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.inventoryHistoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateInventoryHistoryDto: UpdateInventoryHistoryDto) {
    return this.inventoryHistoryService.update(id, updateInventoryHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.inventoryHistoryService.remove(id);
  }
}
