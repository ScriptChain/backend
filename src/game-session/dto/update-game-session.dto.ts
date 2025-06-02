import { PartialType } from '@nestjs/mapped-types';
import { CreateGameSessionDto } from './create-game-session.dto';

export class UpdateGameSessionDto extends PartialType(CreateGameSessionDto) {}
