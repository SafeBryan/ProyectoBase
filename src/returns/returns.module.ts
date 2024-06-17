import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Return, OrderItem]), AuthModule, JwtModule
  ],
  controllers: [ReturnsController],
  providers: [ReturnsService],
})
export class ReturnsModule {}
