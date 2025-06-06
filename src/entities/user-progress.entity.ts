import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Book, book => book.id)
  book: Book;

  @Column()
  bookId: number;

  @Column()
  pagesRead: number;

  @CreateDateColumn()
  timestamp: Date;
} 