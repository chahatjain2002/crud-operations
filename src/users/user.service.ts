import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDetailsDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(createUser: CreateUserDto): Promise<string> {
    const user: CreateUserDto = new CreateUserDto();
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.birthDate = createUser.birthDate;
    user.address = createUser.address;
    await this.userRepository.save(user);
    return 'User created successfully';
  }

  async getUser(id: number): Promise<UserDetailsDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: number, attrs: Partial<UserDetailsDto>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    Object.assign(user, attrs);
    const updatedUser = await this.userRepository.save(user);
    const userDetails: UserDetailsDto = new UserDetailsDto();
    userDetails.firstName = updatedUser.firstName;
    userDetails.lastName = updatedUser.lastName;
    userDetails.birthDate = updatedUser.birthDate;
    userDetails.address = updatedUser.address;
    return userDetails;
  }

  async deleteUser(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(user);
    return 'User deleted successfully';
  }
}
