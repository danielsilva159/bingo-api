import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BingoRoomStatus, Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    if (new Date(dto.dateStart) <= new Date()) {
      throw new BadRequestException('A data de início deve ser futura');
    }

    const room = this.roomRepository.create(dto);

    return this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find({
      order: {
        createAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException('Sala não encontrada');
    }

    return room;
  }

  async update(id: string, dto: UpdateRoomDto): Promise<Room> {
    const sala = await this.findOne(id);

    if (sala.status === BingoRoomStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Não é possível alterar uma sala em andamento',
      );
    }

    Object.assign(sala, dto);

    return this.roomRepository.save(sala);
  }

  async remove(id: string): Promise<void> {
    const room = await this.findOne(id);

    if (room.status === BingoRoomStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Não é possível excluir uma sala em andamento',
      );
    }

    await this.roomRepository.remove(room);
  }
}
