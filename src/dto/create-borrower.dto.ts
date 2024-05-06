import { IsNotEmpty, IsString } from 'class-validator';
import { BorrowStatus } from '@prisma/client';

export class CreateBorrowerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  itemDescription: string;

  @IsString()
  @IsNotEmpty()
  status: BorrowStatus;
}
