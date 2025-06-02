import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text', { array: true, nullable: true })
  tags?: string[];
}
