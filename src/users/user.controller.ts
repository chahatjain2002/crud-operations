import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDetailsDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<UserDetailsDto> {
    return this.userService.getUser(parseInt(id));
  }

  @Patch('update/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<UserDetailsDto> {
    return this.userService.updateUser(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.deleteUser(parseInt(id));
  }
}
