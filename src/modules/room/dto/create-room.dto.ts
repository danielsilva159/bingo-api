import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(1)
  valuePrice: number;

  @IsNumber()
  @Min(1)
  maxPlayers: number;

  @IsNumber()
  @Min(1)
  maxCardsPerPlayer: number;

  @IsDateString()
  dateStart: Date;

  @IsNumber()
  @Min(1)
  awards: number;
}
