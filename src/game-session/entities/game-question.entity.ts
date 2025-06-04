import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GameQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  correctAnswer: string;

  @Column("text", { array: true })
  options: string[];

  @Column({ nullable: true })
  bookId: number; 
}
