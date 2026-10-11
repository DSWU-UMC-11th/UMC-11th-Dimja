import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(): Promise<any> {
    return await this.bookService.getBooks();
  }

  // 4주차: DTO 검증 + 201 Created
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBook(@Body() dto: CreateBookDto): Promise<any> {
    return await this.bookService.createBookOrm(dto);
  }

  @Get('category/:categoryId')
  async getBooksByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<any> {
    return await this.bookService.getBooksByCategory(Number(categoryId));
  }
}
