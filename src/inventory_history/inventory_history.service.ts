import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInventoryHistoryDto } from './dto/create-inventory_history.dto';
import { UpdateInventoryHistoryDto } from './dto/update-inventory_history.dto';
import { InventoryHistory } from './entities/inventory_history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class InventoryHistoryService {
  constructor(
    @InjectRepository(InventoryHistory)
    private readonly inventoryHistoryRepository: Repository<InventoryHistory>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createInventoryHistoryDto: CreateInventoryHistoryDto) {
    const product = await this.productsRepository.findOne({
      where: { id: createInventoryHistoryDto.productoId },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const inventoryHistory = this.inventoryHistoryRepository.create({
      ...createInventoryHistoryDto,
      producto: product,
    });

    return await this.inventoryHistoryRepository.save(inventoryHistory);
  }

  async findAll() {
    return await this.inventoryHistoryRepository.find();
  }

  async findOne(id: number) {
    return await this.inventoryHistoryRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateInventoryHistoryDto: UpdateInventoryHistoryDto,
  ) {
    return await this.inventoryHistoryRepository.update(
      id,
      updateInventoryHistoryDto,
    );
  }

  async remove(id: number) {
    return await this.inventoryHistoryRepository.softDelete(id);
  }
}
