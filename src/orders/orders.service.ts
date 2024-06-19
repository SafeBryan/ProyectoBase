import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ){}
  async create(CreateOrderDto: CreateOrderDto) {
    const user = await this.ordersRepository.findOneBy({
      estado: CreateOrderDto.user,
    });
    if (!user) {
      throw new BadRequestException('Usuario not found');
    }
    const product = this.ordersRepository.create({
      ...CreateOrderDto,
      user,
    });
    return await this.ordersRepository.save(product);
  }

  async findAll() {
    return await this.ordersRepository.find();
  }

  async findOne(id: number) {
    return await this.ordersRepository.findBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return ;
  }

  async remove(id: number) {
    return await this.ordersRepository.softDelete({ id });  }
}
