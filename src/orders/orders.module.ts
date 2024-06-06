import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from '../users/users.module';


  @Module({
    imports: [TypeOrmModule.forFeature([Order]), UsersModule],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
