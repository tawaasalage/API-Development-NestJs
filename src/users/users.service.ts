import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Role } from '../const/roles.enum';

@Injectable()
export class UsersService {
    private users: User[] = [{ id: 1, name: 'John Doe',roles: [Role.User]  }];

  // Method to find all users
  findAll(): User[] {
    return this.users;
  }

  // Method to find a user by ID
  findOne(id: number): User {
    return this.users.find(user => user.id === id);
  }

  // Method to create a new user
  create(user: User) {
     this.users.push(user);
     return user;
  }
}
