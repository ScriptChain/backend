import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game-session.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { UpdateGameSessionDto } from './dto/update-game-session.dto';
import { GameQuestionDto } from './dto/game-question.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('question')
  async getQuestion(): Promise<GameQuestionDto> {
    return this.gameService.getQuestion();
  }

  @Post('answer')
  async submitAnswer(@Body() dto: SubmitAnswerDto) {
    return this.gameService.submitAnswer(dto);
  }
}
