import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GameQuestion } from "./game-question.entity";
import { GameSession } from "./game-session.entity";

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GameSession)
  gameSession: GameSession;

  @ManyToOne(() => GameQuestion)
  question: GameQuestion;

  @Column()
  answer: string;

  @Column()
  isCorrect: boolean;

  @CreateDateColumn()
  answeredAt: Date;
}
