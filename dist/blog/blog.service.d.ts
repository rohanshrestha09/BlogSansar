import { Response } from 'express';
import { Model } from 'mongoose';
import { UserInterface } from 'src/user/interface/user.interface';
import { PostDto } from './dto/blog.dto';
import { BlogInterface } from './interface/blog.interface';
export declare class BlogService {
    private readonly blogModel;
    private readonly userModel;
    constructor(blogModel: Model<BlogInterface>, userModel: Model<UserInterface>);
    getAllBlogs(res: Response): Promise<Response>;
    getBlogsById(res: Response, { id }: {
        id: any;
    }): Promise<Response>;
    postBlogs(res: Response, post: PostDto): Promise<Response>;
    deleteBlogs(res: Response, { id }: {
        id: any;
    }): Promise<Response>;
}
