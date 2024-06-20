import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const order = await this.ordersRepository.findOne({
      where: { id: createPaymentDto.orderId },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      order,
    });

    return await this.paymentRepository.save(payment);
  }

  async findAll() {
    return await this.paymentRepository.find();
  }

  async findOne(id: number) {
    return await this.paymentRepository.findOneBy({ id });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);  
  }

  async remove(id: number) {
    return await this.paymentRepository.softDelete({ id });
  }
}
