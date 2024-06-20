import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
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
@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Post()
  @ApiBody({ description: 'Create a new promotion', type: CreatePromotionDto })
  @ApiResponse({ status: 201, description: 'Promotion created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionsService.create(createPromotionDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all promotions.' })
  findAll() {
    return this.promotionsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the promotion',
  })
  @ApiResponse({ status: 200, description: 'Promotion details.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  findOne(@Param('id') id: number) {
    return this.promotionsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the promotion to update',
  })
  @ApiBody({
    description: 'Updated promotion details',
    type: UpdatePromotionDto,
  })
  @ApiResponse({ status: 200, description: 'Promotion updated successfully.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  update(
    @Param('id') id: number,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionsService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the promotion to delete',
  })
  @ApiResponse({ status: 200, description: 'Promotion removed successfully.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  remove(@Param('id') id: number) {
    return this.promotionsService.remove(id);
  }
}
