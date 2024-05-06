import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto, EditBorrowerDto } from 'src/dto';

@Controller('borrowers')
export class BorrowersController {
  constructor(private borrowersService: BorrowersService) {}

  @Get()
  getBorrowersByName(@Query('name') borrowerName: string) {
    return this.borrowersService.getBorrowersByName(borrowerName);
  }

  @Get('date-by')
  async getBorrowersByDate(@Query('date') dateString: string) {

    const date = new Date(dateString);
  
    if (!Date.parse(dateString)) {
      throw new BadRequestException('Invalid date format');
    }

    return this.borrowersService.getBorrowersByDate(date);
  }

  @Get()
  getBorrowers() {
    return this.borrowersService.getBorrowers();
  }

  @Get(':id')
  getBorrowerById(@Param('id', ParseIntPipe) borrowerId: number) {
    return this.borrowersService.getBorrowerbyId(borrowerId);
  }

  @Post()
  createBorrower(@Body() dto: CreateBorrowerDto) {
    return this.borrowersService.createBorrower(dto);
  }

  @Put(':id')
  editBorrowerById(@Param('id', ParseIntPipe) borrowerId: number,@Body() dto: EditBorrowerDto) {
    return this.borrowersService.editBorrowerById(borrowerId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBorrower(@Param('id', ParseIntPipe) borrowerId: number) {
    return this.borrowersService.deleteBorrower(borrowerId);
  }
}
