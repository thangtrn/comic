import { SetMetadata } from '@nestjs/common';
import Role from '~/shared/enums/role.enum';

export const ROLES_KEY = 'roles_key';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
