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
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Cambia la búsqueda de usuario a la entidad de User utilizando el campo username
    const user = await this.usersRepository.findOneBy({
      username: createOrderDto.username, // Corrección aquí
    });

    if (!user) {
      throw new BadRequestException('Usuario not found');
    }

    const order = this.ordersRepository.create({
      ...createOrderDto,
      user,
    });

    return await this.ordersRepository.save(order);
  }

  async findAll() {
    return await this.ordersRepository.find();
  }

  async findOne(id: number) {
    return await this.ordersRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.ordersRepository.update(id, updateOrderDto);
    return this.findOne(id); // Devolver la entidad actualizada
  }

  async remove(id: number) {
    return await this.ordersRepository.softDelete({ id });
  }
}
