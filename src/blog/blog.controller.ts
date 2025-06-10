import { Controller, Post as PostMethod, Body, Get, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Request } from 'express';
import { CreateBlogPostDto } from './dto/create-blog.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';


interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  
  @PostMethod()
  create(@Body() createPostDto: CreateBlogPostDto, @Req() req: AuthenticatedRequest) {
    return this.blogService.create(createPostDto, req.user.id);
  }
  
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.blogService.remove(id, req.user.id);
  }
}
