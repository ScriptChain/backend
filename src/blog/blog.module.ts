import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Post } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
