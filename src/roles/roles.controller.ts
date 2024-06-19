import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBody({ description: 'Create a new role', type: CreateRoleDto })
  @ApiResponse({ status: 201, description: 'Role created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all roles.' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the role' })
  @ApiResponse({ status: 200, description: 'Role details.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the role to update',
  })
  @ApiBody({ description: 'Updated role details', type: UpdateRoleDto })
  @ApiResponse({ status: 200, description: 'Role updated successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the role to delete',
  })
  @ApiResponse({ status: 200, description: 'Role deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }
}
