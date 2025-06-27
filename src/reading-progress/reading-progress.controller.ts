import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ReadingProgressService } from './reading-progress.service';

interface UpdateReadingProgressDto {
  userId: number;
  bookId: number;
  pagesRead: number;
}

@Controller('reading')
export class ReadingProgressController {
  constructor(private readonly readingProgressService: ReadingProgressService) {}

  @Post('update')
  async updateReadingProgress(@Body() updateDto: UpdateReadingProgressDto) {
    try {
      const { userId, bookId, pagesRead } = updateDto;
      
      if (!userId || !bookId || pagesRead === undefined) {
        throw new HttpException(
          'Missing required fields: userId, bookId, or pagesRead',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (pagesRead < 0) {
        throw new HttpException(
          'Pages read cannot be negative',
          HttpStatus.BAD_REQUEST,
        );
      }

      const progress = await this.readingProgressService.updateReadingProgress(
        userId,
        bookId,
        pagesRead,
      );

      return {
        success: true,
        data: progress,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update reading progress',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 