import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    const user = await this.userRepository.findOneBy({
      username: createShoppingCartDto.user,
    });
    if (!user) {
      throw new BadRequestException('Category not found');
    }
    const shopping_cart = this.shoppingCartRepository.create({
      ...createShoppingCartDto,
      user,
    });
    return await this.shoppingCartRepository.save(shopping_cart);
  }

  findAll() {
    return `This action returns all shoppingCarts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
