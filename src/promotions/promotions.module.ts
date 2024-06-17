import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion]), AuthModule, JwtModule],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [TypeOrmModule],
})
export class PromotionsModule {}
