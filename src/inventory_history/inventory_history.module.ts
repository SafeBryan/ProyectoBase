import { Module } from '@nestjs/common';
import { InventoryHistoryService } from './inventory_history.service';
import { InventoryHistoryController } from './inventory_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryHistory } from './entities/inventory_history.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryHistory]), ProductsModule],
  controllers: [InventoryHistoryController],
  providers: [InventoryHistoryService],
})
export class InventoryHistoryModule {}
