import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
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
@ApiTags('returns')
@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post()
  @Auth([RoleEnum.USER])
  @ApiBody({ description: 'Create a return', type: CreateReturnDto })
  @ApiResponse({ status: 201, description: 'Return created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }

  @Get()
  @Auth([RoleEnum.USER])
  @ApiResponse({ status: 200, description: 'Retrieve all returns.' })
  findAll() {
    return this.returnsService.findAll();
  }

  @Get(':id')
  @Auth([RoleEnum.USER])
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the return' })
  @ApiResponse({ status: 200, description: 'Return details.' })
  @ApiResponse({ status: 404, description: 'Return not found.' })
  findOne(@Param('id') id: number) {
    return this.returnsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the return to update',
  })
  @ApiBody({ description: 'Updated return details', type: UpdateReturnDto })
  @ApiResponse({ status: 200, description: 'Return updated successfully.' })
  @ApiResponse({ status: 404, description: 'Return not found.' })
  update(@Param('id') id: number, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnsService.update(id, updateReturnDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the return to delete',
  })
  @ApiResponse({ status: 200, description: 'Return deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Return not found.' })
  remove(@Param('id') id: number) {
    return this.returnsService.remove(id);
  }
}
