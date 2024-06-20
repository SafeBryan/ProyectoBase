import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { In } from 'typeorm';


@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const products = await this.productRepository.findBy({
      id: In(createPromotionDto.productIds),
    });
    if (products.length !== createPromotionDto.productIds.length) {
      throw new BadRequestException('One or more products not found');
    }

    const promotion = this.promotionRepository.create({
      ...createPromotionDto,
      products,
    });

    return await this.promotionRepository.save(promotion);
  }

  async findAll() {
    return await this.promotionRepository.find({ relations: ['products'] });
  }

  async findOne(id: number) {
    return await this.promotionRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.findOne(id);
    if (!promotion) {
      throw new BadRequestException('Promotion not found');
    }

    const products = await this.productRepository.findBy({
      id: In(updatePromotionDto.productIds),
    });
    if (products.length !== updatePromotionDto.productIds.length) {
      throw new BadRequestException('One or more products not found');
    }

    await this.promotionRepository.update(id, {
      ...updatePromotionDto,
      products,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const promotion = await this.findOne(id);
    if (!promotion) {
      throw new BadRequestException('Promotion not found');
    }

    return await this.promotionRepository.softDelete(id);
  }
}
