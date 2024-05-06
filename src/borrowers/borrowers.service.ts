import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowerDto, EditBorrowerDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowersService {
  constructor(private prisma: PrismaService) {}

  async getBorrowersByName(borrowerName: string) {
    const borrowers = await this.prisma.borrowers.findMany({
      where: {
        name: {
          contains: borrowerName,
          mode: 'insensitive',
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
    return borrowers;
  }

  async getBorrowersByDate(date: Date) {
    
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const borrowers = await this.prisma.borrowers.findMany({
      where: {
        OR: [
          {
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
          {
            updatedAt: {
              gte: startDate,
              lt: endDate,
            },
          },
        ],
      },
    });

    return borrowers;
  }

  async getBorrowers() {
    const borrowers = await this.prisma.borrowers.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return borrowers;
  }

  async getBorrowerbyId(borrowerId: number) {
    const borrower = await this.prisma.borrowers.findUnique({
      where: {
        id: borrowerId,
      },
    });

    if (!borrower) {
      throw new NotFoundException('Borrower Not Found');
    }

    return borrower;
  }

  async createBorrower(dto: CreateBorrowerDto) {
    const borrower = await this.prisma.borrowers.create({
      data: {
        name: dto.name,
        itemDescription: dto.itemDescription,
        status: dto.status,
      },
    });

    return { borrower, message: 'Successfully Added!' };
  }

  async editBorrowerById(borrowerId: number, dto: EditBorrowerDto) {
    const borrower = await this.prisma.borrowers.findUnique({
      where: {
        id: borrowerId,
      },
    });

    if (!borrower) {
      throw new NotFoundException('Borrower not found');
    }

    const updatedBorrower = await this.prisma.borrowers.update({
      where: {
        id: borrowerId,
      },
      data: {
        ...dto,
      },
    });

    return { updatedBorrower, message: 'Updated Successfully' };
  }

  async deleteBorrower(borrowerId: number) {
    const borrower = await this.prisma.borrowers.findUnique({
      where: {
        id: borrowerId,
      },
    });

    if (!borrower) {
      throw new NotFoundException('Borrower not found');
    }

    await this.prisma.borrowers.delete({ where: { id: borrowerId } });
  }
}
