import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(login: LoginDto) {
    const user = await this.repository.findOne({
      where: { email: login.email },
    });

    if (!user) {
      throw new NotFoundException('Email não cadastrado');
    }

    const passwordValid = bcrypt.compareSync(login.password, user.password);
    if (!passwordValid) {
      throw new BadRequestException('Senha invalida');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.perfil,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '15m',
      }),

      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
