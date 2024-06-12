import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { RoleEnum } from '../../common/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Auth = (role: RoleEnum) => applyDecorators(
    SetMetadata(ROLES_KEY, role),
    UseGuards(AuthGuard, RolesGuard)
);
