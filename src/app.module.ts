import { Module } from '@nestjs/common';
import { BorrowersModule } from './borrowers/borrowers.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BorrowersModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
