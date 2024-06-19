import { Module } from '@nestjs/common';
import { InventoryHistoryService } from './inventory_history.service';
import { InventoryHistoryController } from './inventory_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryHistory } from './entities/inventory_history.entity';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryHistory]), ProductsModule, AuthModule, JwtModule],
  controllers: [InventoryHistoryController],
  providers: [InventoryHistoryService],
})
export class InventoryHistoryModule {}
