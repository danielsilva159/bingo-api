import { Room } from 'src/modules/room/entities/room.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum BingoCardStatus {
  RESERVED = 'RESERVED',
  PAID = 'PAID',
  PLAYING = 'PLAYING',
  WINNER = 'WINNER',
  LOST = 'LOST',
  CANCELLED = 'CANCELLED',
}
@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  numbers: number[][];

  @Column({
    type: 'enum',
    enum: BingoCardStatus,
    default: BingoCardStatus.RESERVED,
  })
  status: BingoCardStatus;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column()
  roomId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
