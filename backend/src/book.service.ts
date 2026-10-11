import { Injectable, NotFoundException } from '@nestjs/common'; // NotFoundException 추가
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRepository } from './book.repository';
import { Book } from './entities/book.entity';
import { Category } from './entities/category.entity'; // 추가
import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto'; // 추가

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository, // 3주차 Raw SQL
    @InjectRepository(Book)
    private readonly bookOrmRepository: Repository<Book>,
    @InjectRepository(Category) // 추가
    private readonly categoryOrmRepository: Repository<Category>,
  ) {}

  async getBooks(): Promise<BookResponseDto[]> {
    const books = await this.bookOrmRepository.find({
      relations: { category: true },
      order: { bookId: 'DESC' },
    });
    return books.map((book) => BookResponseDto.from(book));
  }

  // 4주차 실습 2: ORM 저장
  async createBookOrm(dto: CreateBookDto): Promise<BookResponseDto> {
    const category = await this.categoryOrmRepository.findOneBy({
      categoryId: dto.categoryId,
    });
    if (!category) {
      throw new NotFoundException('존재하지 않는 카테고리입니다.');
    }

    const book = this.bookOrmRepository.create({
      category,
      title: dto.title,
      description: dto.description ?? null,
    });
    const saved = await this.bookOrmRepository.save(book);
    return BookResponseDto.from(saved);
  }

  // 3주차 코드 (그대로 유지)
  async getAllBooks(): Promise<any> {
    return await this.bookRepository.findAll();
  }

  async createBook(body: Record<string, any>): Promise<string> {
    await this.bookRepository.create(body);
    return '도서 등록이 완료되었습니다!';
  }

  async getBooksByCategory(categoryId: number): Promise<any> {
    return await this.bookRepository.findByCategoryId(categoryId);
  }
}
