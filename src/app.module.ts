import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: 'postgres', 
      password: 'postgres',   
      database: 'quiz_game',  
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,   
    }),
  ],
})
export class AppModule {}
