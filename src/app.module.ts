import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeormConfig from './config/typeorm.config'; // your external config
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { ActivityLog } from './entities/activity-log.entity';
import { BlogModule } from './blog/blog.module';
import { ReadingProgressModule } from './reading-progress/reading-progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Use external config for TypeORM if available, else fallback to inline config
    TypeOrmModule.forRoot(typeormConfig || {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'quiz_game',
      entities: [User, Book, ActivityLog, __dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BlogModule,
    ReadingProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
