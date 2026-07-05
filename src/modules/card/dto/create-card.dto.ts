import { IsUUID } from 'class-validator';

export class CreateCardDto {
  @IsUUID()
  roomId: string;

  @IsUUID()
  userId: string;
}
