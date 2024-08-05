import { ForbiddenException } from '@nestjs/common';
import { Types } from 'mongoose';
import Role from '~/shared/enums/role.enum';

const checkUserPermission = (
  userId: Types.ObjectId,
  resourceId: Types.ObjectId,
  userRole: Role,
): void => {
  if (userId.toString() !== resourceId.toString() && userRole !== Role.Admin) {
    throw new ForbiddenException(
      "You don't have permission to perform this action",
    );
  }
};

export default checkUserPermission;
