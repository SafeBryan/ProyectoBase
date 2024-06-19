import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { RoleEnum } from 'src/common/enums/role.enum';

@ApiBearerAuth()
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
  @ApiBody({ description: 'Create a new brand', type: CreateBrandDto })
  @ApiResponse({ status: 201, description: 'Brand created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Auth([RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.OWNER])
  @Get()
  @ApiResponse({ status: 200, description: 'List of all brands.' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Auth([RoleEnum.USER])
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the brand' })
  @ApiResponse({ status: 200, description: 'Details of a specific brand.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  findOne(@Param('id') id: number) {
    return this.brandsService.findOne(id);
  }

  @Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the brand to update',
  })
  @ApiBody({ description: 'Updated brand details', type: UpdateBrandDto })
  @ApiResponse({ status: 200, description: 'Brand updated successfully.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the brand to delete',
  })
  @ApiResponse({ status: 200, description: 'Brand deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  remove(@Param('id') id: number) {
    return this.brandsService.remove(id);
  }
}
