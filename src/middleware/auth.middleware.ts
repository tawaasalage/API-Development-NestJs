import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../const/roles.enum'; // Adjust path as per your project structure
import { ExtendedRequest } from '../types/extended-request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    // Simulate a logged-in user with roles
    req.user = { id: 1, name: 'John Doe', roles: [Role.Admin] };
    next();
  }
}