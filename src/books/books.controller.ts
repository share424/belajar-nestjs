import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('books')
export class BooksController {
  @Get('/:name')
  hello(@Param('name') name: string) {
    return `Hello ${name}`;
  }

  @Post()
  createBook(@Body('name') name: string) {
    return name;
  }
}
