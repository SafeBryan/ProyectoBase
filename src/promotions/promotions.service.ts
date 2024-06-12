import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return await this.promotionRepository.save(promotion); 
  }

  async findAll() {
    return await this.promotionRepository.find(); 
  }

  async findOne(id: number) {
    const promotion = await this.promotionRepository.findOneBy({ id });
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
    return promotion; 
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionRepository.preload({
      id: id,
      ...updatePromotionDto,
    });
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
    return await this.promotionRepository.save(promotion); 
  }

  async remove(id: number) {
    const result = await this.promotionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
    return { message: `Promotion with ID ${id} removed successfully` }; 
  }
}
