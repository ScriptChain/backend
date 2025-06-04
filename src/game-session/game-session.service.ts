import { Injectable, NotFoundException } from '@nestjs/common';
import { GameSession } from './entities/game-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GameQuestion } from './entities/game-question.entity';
import { UserAnswer } from './entities/user-answer.entity';
import { GameQuestionDto } from './dto/game-question.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameSession)
    private sessionRepo: Repository<GameSession>,

    @InjectRepository(GameQuestion)
    private questionRepo: Repository<GameQuestion>,

    @InjectRepository(UserAnswer)
    private answerRepo: Repository<UserAnswer>,
  ) {}

  async getQuestion(): Promise<GameQuestionDto> {
    const question = await this.questionRepo
      .createQueryBuilder("question")
      .orderBy("RANDOM()")
      .getOne();
  
    if (!question) {
      throw new NotFoundException('No questions available');
    }
  
    return {
      id: question.id,
      question: question.question,
      options: question.options,
    };
  }

  async submitAnswer(dto: SubmitAnswerDto): Promise<{ correct: boolean }> {
    const question = await this.questionRepo.findOneByOrFail({ id: dto.questionId });

    const isCorrect = dto.answer === question.correctAnswer;

    const session = await this.sessionRepo.findOneByOrFail({ id: dto.sessionId });

    await this.answerRepo.save({
      gameSession: session,
      question,
      answer: dto.answer,
      isCorrect,
    });

    return { correct: isCorrect };
  }
}
