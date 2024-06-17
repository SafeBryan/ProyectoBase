import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';

@ApiBearerAuth()
@Auth([RoleEnum.ADMIN])
@Auth([RoleEnum.OWNER]) 
@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionsService.create(createPromotionDto);
  }
  @ApiBearerAuth()
  @Auth([RoleEnum.USER])
  @Get()
  findAll() {
    return this.promotionsService.findAll();
  }
  @ApiBearerAuth()
  @Auth([RoleEnum.USER])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.promotionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionsService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.promotionsService.remove(id);
  }
}
