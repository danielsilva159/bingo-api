import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly repository: Repository<Card>,
  ) {}

  async create(dto: CreateCardDto) {
    const card = this.repository.create({
      roomId: dto.roomId,
      userId: dto.userId,
      numbers: this.generateCard(),
    });

    return this.repository.save(card);
  }

  async findAll() {
    return this.repository.find({
      relations: {
        room: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    const card = await this.repository.findOne({
      where: { id },
      relations: {
        room: true,
        user: true,
      },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return card;
  }

  async update(id: string, dto: UpdateCardDto) {
    const card = await this.findOne(id);

    Object.assign(card, dto);

    return this.repository.save(card);
  }

  async remove(id: string) {
    const card = await this.findOne(id);

    await this.repository.remove(card);
  }

  private generateCard(): number[][] {
    const card = [
      this.randomNumbers(1, 15),
      this.randomNumbers(16, 30),
      this.randomNumbers(31, 45, true),
      this.randomNumbers(46, 60),
      this.randomNumbers(61, 75),
    ];
    return card;
  }

  private randomNumbers(
    start: number,
    end: number,
    freeSpace = false,
  ): number[] {
    const numbers: number[] = [];

    while (numbers.length < 5) {
      const value = Math.floor(Math.random() * (end - start + 1)) + start;

      if (!numbers.includes(value)) {
        numbers.push(value);
      }
    }

    numbers.sort((a, b) => a - b);

    if (freeSpace) {
      numbers[2] = 0;
    }

    return numbers;
  }

  async findByUser(userId: string) {
    const cards = await this.repository.find({
      where: {
        userId,
      },
    });

    return cards;
  }
}
