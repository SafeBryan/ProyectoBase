import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/order_items/entities/order_item.entity';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(Return)
    private readonly returnRepository: Repository<Return>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createReturnDto: CreateReturnDto) {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id: createReturnDto.orderItemId },
    });
    if (!orderItem) {
      throw new BadRequestException('Order Item not found');
    }

    const returnEntity = this.returnRepository.create({
      ...createReturnDto,
      orderItem: orderItem,
    });

    return await this.returnRepository.save(returnEntity);
  }

  async findAll() {
    return await this.returnRepository.find();
  }

  async findOne(id: number) {
    return await this.returnRepository.findOne({ where: { id } });
  }

  async update(id: number, updateReturnDto: UpdateReturnDto) {
    return await this.returnRepository.update(id, updateReturnDto);
  }

  async remove(id: number) {
    return await this.returnRepository.softDelete(id);
  }
}
