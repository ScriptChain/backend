import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from '../entities/user-progress.entity';

@Injectable()
export class ReadingProgressService {
  constructor(
    @InjectRepository(UserProgress)
    private userProgressRepository: Repository<UserProgress>,
  ) {}

  async updateReadingProgress(
    userId: number,
    bookId: number,
    pagesRead: number,
  ): Promise<UserProgress> {
    let progress = await this.userProgressRepository.findOne({
      where: { userId, bookId },
    });

    if (!progress) {
      progress = this.userProgressRepository.create({
        userId,
        bookId,
        pagesRead,
      });
    } else {
      progress.pagesRead = pagesRead;
    }

    return this.userProgressRepository.save(progress);
  }

  async getReadingProgress(
    userId: number,
    bookId: number,
  ): Promise<UserProgress> {
    return this.userProgressRepository.findOne({
      where: { userId, bookId },
    });
  }
} 