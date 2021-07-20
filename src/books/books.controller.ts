import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { User } from 'src/users/entity/user.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Controller('books')
@UseGuards(JwtGuard)
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks(
    @Query() filter: FilterBookDto,
    @GetUser() user: User,
  ): Promise<Book[]> {
    return this.booksService.getBooks(user, filter);
  }

  @Get('/:id')
  async getBook(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<Book> {
    return this.booksService.getBookById(user, id);
  }

  @Post()
  async createBook(
    @GetUser() user: User,
    @Body() payload: CreateBookDto,
  ): Promise<void> {
    return this.booksService.createBook(user, payload);
  }

  @Put('/:id')
  async updateBook(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateBookDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.booksService.updateBook(user, id, payload);
  }

  @Delete('/:id')
  async deleteBook(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<void> {
    return this.booksService.deleteBook(user, id);
  }
}
