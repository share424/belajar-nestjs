import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';
import { BookRepository } from './repository/book.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooks(user: User, filter: FilterBookDto): Promise<Book[]> {
    return await this.bookRepository.getBooks(user, filter);
  }

  async createBook(user: User, createBookDto: CreateBookDto): Promise<void> {
    return await this.bookRepository.createBook(user, createBookDto);
  }

  async getBookById(user: User, id: string): Promise<Book> {
    const book = await this.bookRepository.findOne(id, { where: { user } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} is not found`);
    }
    return book;
  }

  async updateBook(
    user: User,
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<void> {
    const { title, author, category, year } = updateBookDto;

    const book = await this.getBookById(user, id);
    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;

    await book.save();
  }

  async deleteBook(user: User, id: string): Promise<void> {
    const result = await this.bookRepository.delete({ id, user });
    if (result.affected == 0) {
      throw new NotFoundException(`Book with id ${id} is not found`);
    }
  }
}
