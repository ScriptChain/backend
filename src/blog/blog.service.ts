import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/blog.entity';
import { CreateBlogPostDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  async create(createPostDto: CreateBlogPostDto, userId: string) {
    const post = this.postRepo.create({ ...createPostDto, userId });
    return this.postRepo.save(post);
  }

  async findAll() {
    return this.postRepo.find({ order: { createdAt: 'DESC' } });
  }

  async remove(id: string, userId: string) {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.userId !== userId) throw new ForbiddenException('Not allowed to delete this post');
    return this.postRepo.remove(post);
  }
}
