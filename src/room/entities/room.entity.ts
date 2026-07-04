import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BingoRoomStatus {
  SCHEDULED = 'SCHEDULED',
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Room {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  maxPlayers: number;

  @Column()
  maxCardsPerPlayer: number;

  @Column()
  dateStart: Date;

  @Column()
  awards: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  valuePrice: number;

  @Column({
    type: 'enum',
    enum: BingoRoomStatus,
    default: BingoRoomStatus.SCHEDULED,
  })
  status: BingoRoomStatus;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
