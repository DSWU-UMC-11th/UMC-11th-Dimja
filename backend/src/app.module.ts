// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.provider';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { RentalRepository } from './rental.repository';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    BookController, // 추가!
    RentalController, //미션2
  ],
  providers: [
    ...databaseProviders,
    AppService,
    BookService, // 추가!
    BookRepository, // 추가
    RentalService,           // 미션2 추가
    RentalRepository,        // 미션2 추가
  ],
  exports: [...databaseProviders],
})
export class AppModule {}
