import * as express from 'express';
import { UserDocument } from '~/schemas/user.schema';

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
