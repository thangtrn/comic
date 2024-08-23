import { SetMetadata } from '@nestjs/common';
import Role from '~/shared/enums/role.enum';

export const SECURED_KEY = 'SECURED_KEY';
export const Secured = (...roles: Role[]) => SetMetadata(SECURED_KEY, roles);
