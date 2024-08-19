import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Role } from '../../const/roles.enum';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  readonly name: string;

  @IsEnum(Role, { each: true }) // Validate each item in the array against the Role enum
  @IsNotEmpty({ each: true }) // Ensure each item in the array is not empty
  @ApiProperty({ example: 'Admin', description: 'The Role of the user' })
  readonly roles: Role[];
}
