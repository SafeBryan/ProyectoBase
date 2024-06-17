import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { RoleEnum } from 'src/common/enums/role.enum';
@ApiBearerAuth()
@Auth([RoleEnum.ADMIN])
@Auth([RoleEnum.OWNER]) 
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Auth([RoleEnum.USER])
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }
  @ApiBearerAuth()
  @Auth([RoleEnum.USER])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandsService.remove(id);
  }
}
