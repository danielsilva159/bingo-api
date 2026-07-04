import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PerfilEnum {
  ADMINISTRADOR = 'administrador',
  PADRAO = 'padrão',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  dateOfBirth: Date;

  @Column({ default: PerfilEnum.PADRAO })
  perfil: PerfilEnum;
}
