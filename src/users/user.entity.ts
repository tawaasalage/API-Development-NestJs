import { Role } from '../const/roles.enum';

export class User {
    id: number;
    name: string;
    roles: Role[];
  }