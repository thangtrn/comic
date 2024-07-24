import { Types } from 'mongoose';

export type JwtPayload = {
  userId: string | Types.ObjectId;
};
