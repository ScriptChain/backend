import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ActivityLog } from '../entities/activity-log.entity';


export enum AuthMethod {
  EMAIL = 'email',
  STARKNET = 'starknet',

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',

}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;


  @Column({ unique: true, nullable: true })
  starknetAddress: string;

  @Column({
    type: 'enum',
    enum: AuthMethod,
    default: AuthMethod.EMAIL
  })
  authMethod: AuthMethod;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;


  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs: ActivityLog[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  validateAuthMethod() {
    if (this.authMethod === AuthMethod.EMAIL && !this.email) {
      throw new Error('Email is required for email authentication');
    }
    
    if (this.authMethod === AuthMethod.STARKNET && !this.starknetAddress) {
      throw new Error('StarkNet address is required for StarkNet authentication');
    }
  }
}
