import { Controller, Get, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { TokenBalanceGuard } from '../auth/guards/token-balance.guard';
import { Request } from 'express';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('books')
export class BookController {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  @Get(':id/locked')
  @UseGuards(TokenBalanceGuard)
  async getLockedBook(@Param('id') id: string, @Req() req: Request) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return { lockedContent: book.lockedContent };
  }
}
