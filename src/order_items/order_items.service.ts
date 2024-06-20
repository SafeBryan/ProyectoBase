import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order_item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const order = await this.ordersRepository.findOne({
      where: { id: createOrderItemDto.orderId },
    });
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const product = await this.productsRepository.findOne({
      where: { id: createOrderItemDto.productoId },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const orderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      order: order,
      product: product,
    });

    return await this.orderItemRepository.save(orderItem);
  }

  async findAll() {
    return await this.orderItemRepository.find();
  }

  async findOne(id: number) {
    return await this.orderItemRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    await this.orderItemRepository.update(id, updateOrderItemDto);
    return this.findOne(id); 
  }

  async remove(id: number) {
    return await this.orderItemRepository.softDelete(id);
  }
}
