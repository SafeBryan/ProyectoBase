import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return await this.promotionRepository.save(createPromotionDto);
  }

  async findAll() {
    return await this.promotionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} promotion`;
  }

  update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return `This action updates a #${id} promotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
