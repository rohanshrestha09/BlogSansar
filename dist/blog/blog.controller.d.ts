import { Response } from 'express';
import { BlogService } from './blog.service';
import { PostDto } from './dto/blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    getAllBlogs(res: Response): Promise<Response>;
    getblogsbyId(res: Response, param: any): Promise<Response>;
    postBlogs(res: Response, post: PostDto): Promise<Response>;
    deleteblogs(res: Response, param: any): Promise<Response>;
}
