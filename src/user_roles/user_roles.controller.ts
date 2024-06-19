import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user-roles')
@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  @ApiBody({ description: 'Create a user role', type: CreateUserRoleDto })
  @ApiResponse({ status: 201, description: 'User role created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all user roles.' })
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user role',
  })
  @ApiResponse({ status: 200, description: 'User role details.' })
  @ApiResponse({ status: 404, description: 'User role not found.' })
  findOne(@Param('id') id: number) {
    return this.userRolesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user role to update',
  })
  @ApiBody({
    description: 'Updated user role details',
    type: UpdateUserRoleDto,
  })
  @ApiResponse({ status: 200, description: 'User role updated successfully.' })
  @ApiResponse({ status: 404, description: 'User role not found.' })
  update(
    @Param('id') id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user role to delete',
  })
  @ApiResponse({ status: 200, description: 'User role deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User role not found.' })
  remove(@Param('id') id: number) {
    return this.userRolesService.remove(id);
  }
}
