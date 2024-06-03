import { BadRequestException, Injectable, UnauthorizedException, } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import {UsersService} from "src/users/users.service";

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
      ){}

        async register({ name, email, password  }: RegisterDto) {
            const user = await this.userService.findOneByEmail(email);
        
            if (user) {
              throw new BadRequestException("Email already exists");
            }
        
            const hashedPassword = await bcryptjs.hash(password, 10);
        
            await this.userService.create({ name, email, password: hashedPassword, });
        
            return {
              message: "User created successfully",
            };
          }
          
    async login({email, password}:LoginDto){
        const user = await this.userService.findOneByEmail(email);
        
        if(!user){
          throw new UnauthorizedException("Email is wrong");
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('Password is wrong')
        }

        const payload = { email: user.email, sub: user.id}

        const token = await this.jwtService.signAsync(payload)

        return {
          token,
          email,
        };

    }


}
