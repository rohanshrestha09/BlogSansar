import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BlogService } from './blog.service';
import { PostDto } from './dto/blog.dto';

@Controller('api/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('all')
  getAllBlogs(@Res() res: Response): Promise<Response> {
    return this.blogService.getAllBlogs(res);
  }

  @Get('get/:id')
  getblogsbyId(@Res() res: Response, @Param() param): Promise<Response> {
    return this.blogService.getBlogsById(res, param);
  }
  @Post('post')
  postBlogs(@Res() res: Response, @Body() post: PostDto): Promise<Response> {
    return this.blogService.postBlogs(res, post);
  }

  @Delete('delete/:id')
  deleteblogs(@Res() res: Response, @Param() param): Promise<Response> {
    return this.blogService.deleteBlogs(res, param);
  }
}
