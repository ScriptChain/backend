import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
