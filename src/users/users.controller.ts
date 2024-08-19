import { Controller, Get, Post, Body, Param, ParseIntPipe, UsePipes,UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../const/roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('users')  // Tag the controller for Swagger
@ApiBearerAuth()   // Specify that JWT is used for authorization
@Controller('users')
@UseGuards(RolesGuard) // Apply RolesGuard to all routes in the controller
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Get all users' })  // Describe the operation
    @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
    findAll(): User[] {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    @Roles(Role.User)
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
    findOne(@Param('id', ParseIntPipe) id: number): User {
      return this.usersService.findOne(id);
    }
  
    @Post()
    // @UsePipes(ValidationPipe) //add validation only specific method
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    create(@Body() createUserDto: CreateUserDto) {
      const user: User = { id: Date.now(), ...createUserDto };
      return this.usersService.create(user);
    }
}
