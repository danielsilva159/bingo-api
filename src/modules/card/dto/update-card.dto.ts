import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { BingoCardStatus } from '../entities/card.entity';
import { IsEnum } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsEnum(BingoCardStatus)
  status: BingoCardStatus;
}
