import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
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
      username: createShoppingCartDto.username,
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

  async update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    const shoppingCart = await this.shoppingCartRepository.findOneBy({ id });
    if (!shoppingCart) {
      throw new NotFoundException(`Shopping cart with ID ${id} not found`);
    }

    if (updateShoppingCartDto.username) {
      const user = await this.userRepository.findOneBy({
        username: updateShoppingCartDto.username,
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      shoppingCart.user = user;  
    }

    const updatedShoppingCart = this.shoppingCartRepository.create({
      ...shoppingCart,
      ...updateShoppingCartDto,
    });

    return await this.shoppingCartRepository.save(updatedShoppingCart);
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
