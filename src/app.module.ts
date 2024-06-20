import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { PeopleModule } from './people/people.module';
import { ShoppingCartsModule } from './shopping_carts/shopping_carts.module';
import { BrandsModule } from './brands/brands.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { PaymentsModule } from './payments/payments.module';
import { ReturnsModule } from './returns/returns.module';
import { InventoryHistoryModule } from './inventory_history/inventory_history.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { PromotionsModule } from './promotions/promotions.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "081012",
      database: "proyecto",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    PeopleModule,
    ShoppingCartsModule,
    BrandsModule,
    CartItemsModule,
    OrderItemsModule,
    PaymentsModule,
    ReturnsModule,
    InventoryHistoryModule,
    RolesModule,
    UserRolesModule,
    PromotionsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
