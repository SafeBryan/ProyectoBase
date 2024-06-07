import { Module } from '@nestjs/common';
import { ShoppingCartsService } from './shopping_carts.service';
import { ShoppingCartsController } from './shopping_carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart]), UsersModule],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
})
export class ShoppingCartsModule {}

