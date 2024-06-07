import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [TypeOrmModule], // Asegúrate de que estás exportando TypeOrmModule
})
export class PeopleModule {}
