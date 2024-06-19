import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item.entity';
import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from 'src/shopping_carts/entities/shopping_cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { id: createCartItemDto.carritoId }, 
    });
    if (!shoppingCart) {
      throw new BadRequestException('Shopping cart not found'); 
    }

    const product = await this.productsRepository.findOne({
      where: { id: createCartItemDto.productoId }, 
    });
    if (!product) {
      throw new BadRequestException('Product not found'); 
    }

    const cartItem = this.cartItemRepository.create({
      ...createCartItemDto,
      shopping_cart: shoppingCart, 
      product,
    });

    return await this.cartItemRepository.save(cartItem);
  }

  async findAll() {
    return await this.cartItemRepository.find();
  }

  async findOne(id: number) {
    return await this.cartItemRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return await this.cartItemRepository.update(id, updateCartItemDto);
  }

  async remove(id: number) {
    return await this.cartItemRepository.softDelete(id); 
  }
}
