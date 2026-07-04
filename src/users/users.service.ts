import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, dateOfBirth, perfil } = createUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new HttpException(
        'user already exists in the database',
        HttpStatus.BAD_REQUEST,
      );
    }
    const birth = new Date(dateOfBirth);
    console.log(birth);

    const hash = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hash,
      dateOfBirth: birth,
      perfil,
    });

    return this.userRepository.save(newUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
