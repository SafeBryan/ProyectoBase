import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @ApiBody({ description: 'Create a new person', type: CreatePersonDto })
  @ApiResponse({ status: 201, description: 'Person created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all people.' })
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'The ID of the person' })
  @ApiResponse({ status: 200, description: 'Person details.' })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the person to update',
  })
  @ApiBody({ description: 'Updated person details', type: UpdatePersonDto })
  @ApiResponse({ status: 200, description: 'Person updated successfully.' })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the person to delete',
  })
  @ApiResponse({ status: 200, description: 'Person deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
