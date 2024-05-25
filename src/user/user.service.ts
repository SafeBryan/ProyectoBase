import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';

@Injectable()
export class UserService {
    @InjectRepository(User)
    constructor(private readonly userRepository: Repository<User>){
        
    }

}