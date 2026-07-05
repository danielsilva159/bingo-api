import { IsEmail, IsNotEmpty } from 'class-validator';
import { PerfilEnum } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name required' })
  name: string;

  @IsNotEmpty({ message: 'email required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password required' })
  password: string;

  @IsNotEmpty({ message: 'date of birth required' })
  dateOfBirth: Date;

  perfil: PerfilEnum;
}
