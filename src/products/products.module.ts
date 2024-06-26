import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandsModule } from 'src/brands/brands.module';
import { BrandsService } from 'src/brands/brands.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoriesModule,
    BrandsModule,
    AuthModule,
    JwtModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
