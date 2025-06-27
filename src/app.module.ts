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
<<<<<<< feature/reading-progress-module
import { ReadingProgressModule } from './reading-progress/reading-progress.module';
=======
import { AuthModule } from './auth/auth.module';
import { StarknetModule } from './starknet/starknet.module';
>>>>>>> main

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
<<<<<<< feature/reading-progress-module
    ReadingProgressModule,
=======
    AuthModule,
    StarknetModule,
>>>>>>> main
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
