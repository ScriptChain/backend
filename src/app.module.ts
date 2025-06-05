import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeormConfig from './config/typeorm.config';
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { ActivityLog } from './entities/activity-log.entity';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Use the typeorm config
    TypeOrmModule.forRoot(typeormConfig),
    BlogModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
