import { Test, TestingModule } from '@nestjs/testing';
import { GameSessionController } from './game-session.controller';
import { GameSessionService } from './game-session.service';

describe('GameSessionController', () => {
  let controller: GameSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameSessionController],
      providers: [GameSessionService],
    }).compile();

    controller = module.get<GameSessionController>(GameSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
