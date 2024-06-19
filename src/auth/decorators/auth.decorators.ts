import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { RoleEnum } from 'src/common/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Auth = (roles: RoleEnum | RoleEnum[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, Array.isArray(roles) ? roles : [roles]),
    UseGuards(AuthGuard, RolesGuard),
  );
