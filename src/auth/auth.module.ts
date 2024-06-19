import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UserRolesModule } from 'src/user_roles/user_roles.module'; 
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants/jwt.constant";

@Module({
  imports: [
    UsersModule,
    UserRolesModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
