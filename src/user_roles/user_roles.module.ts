import { Module } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { UserRolesController } from './user_roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), UsersModule, RolesModule],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
