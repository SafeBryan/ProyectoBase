import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const person = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(person);
  }

  async findAll() {
    return await this.personRepository.find();
  }

  async findOne(id: number) {
    return await this.personRepository.findOneBy({ id });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    await this.personRepository.update(id, updatePersonDto);
    return this.personRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.personRepository.delete(id);
  }
}

