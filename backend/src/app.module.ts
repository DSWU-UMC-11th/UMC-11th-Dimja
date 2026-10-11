// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Category } from './entities/category.entity';
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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: Number(configService.getOrThrow('DB_PORT')),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Book, Category]),
  ],
  controllers: [
    AppController,
    BookController,
    RentalController, // 미션2
  ],
  providers: [
    ...databaseProviders,
    AppService,
    BookService,
    BookRepository,
    RentalService, // 미션2 추가
    RentalRepository, // 미션2 추가
  ],
  exports: [...databaseProviders],
})
export class AppModule {}
