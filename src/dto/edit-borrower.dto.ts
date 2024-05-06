import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BorrowStatus } from '@prisma/client';

export class EditBorrowerDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  itemDescription?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: BorrowStatus;
}
