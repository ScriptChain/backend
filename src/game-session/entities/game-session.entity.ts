import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // or a proper relation to User entity

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  startedAt: Date;
}
