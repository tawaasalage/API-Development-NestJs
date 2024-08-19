import { Request } from 'express';
import { User } from '../users/user.entity'; // Assuming User entity is defined in users module

export interface ExtendedRequest extends Request {
  user?: User; // Define user property as optional
}
