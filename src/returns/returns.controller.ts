import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { RoleEnum } from 'src/common/enums/role.enum';

@ApiBearerAuth()
@Auth([RoleEnum.ADMIN])
@Auth([RoleEnum.OWNER]) 
@ApiTags('returns')
@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}
  @ApiBearerAuth()
  @Auth([RoleEnum.USER])
  @Post()
  create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }
  @ApiBearerAuth()
  @Auth([RoleEnum.USER])
  @Get()
  findAll() {
    return this.returnsService.findAll();
  }
  @ApiBearerAuth()
  @Auth([RoleEnum.USER])
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.returnsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnsService.update(id, updateReturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.returnsService.remove(id);
  }
}
