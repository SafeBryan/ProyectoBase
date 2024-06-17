import { Module } from '@nestjs/common';
import { ShoppingCartsService } from './shopping_carts.service';
import { ShoppingCartsController } from './shopping_carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart]), UsersModule, AuthModule, JwtModule],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
  exports: [ShoppingCartsService, TypeOrmModule],  
})
export class ShoppingCartsModule {}


