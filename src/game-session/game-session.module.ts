import { Module } from '@nestjs/common';
import { GameController } from './game-session.controller';
import { GameService } from './game-session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSession } from './entities/game-session.entity';
import { GameQuestion } from './entities/game-question.entity';
import { UserAnswer } from './entities/user-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameSession, GameQuestion, UserAnswer]),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
