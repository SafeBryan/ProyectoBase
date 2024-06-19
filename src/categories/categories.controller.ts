import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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
@Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiBody({ description: 'Create a new category', type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Auth([RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.OWNER])
  @Get()
  @ApiResponse({ status: 200, description: 'List of all categories.' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Auth([RoleEnum.USER])
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the category',
  })
  @ApiResponse({ status: 200, description: 'Details of a specific category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the category to update',
  })
  @ApiBody({ description: 'Updated category details', type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category updated successfully.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Auth([RoleEnum.ADMIN, RoleEnum.OWNER])
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the category to delete',
  })
  @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
