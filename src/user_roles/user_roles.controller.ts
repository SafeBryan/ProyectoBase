import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-roles')
@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userRolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userRolesService.remove(id);
  }
}
