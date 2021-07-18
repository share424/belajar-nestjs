import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks(@Query() filter: FilterBookDto): Promise<Book[]> {
    return this.booksService.getBooks(filter);
  }

  @Get('/:id')
  async getBook(@Param('id', UUIDValidationPipe) id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Post()
  async createBook(@Body() payload: CreateBookDto): Promise<void> {
    return this.booksService.createBook(payload);
  }

  @Put('/:id')
  async updateBook(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateBookDto,
  ): Promise<void> {
    return this.booksService.updateBook(id, payload);
  }

  @Delete('/:id')
  async deleteBook(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
