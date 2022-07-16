import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import mongoose, { Model } from 'mongoose';
import { UserInterface } from 'src/user/interface/user.interface';
import { PostDto } from './dto/blog.dto';
import { BlogInterface } from './interface/blog.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blogpost') private readonly blogModel: Model<BlogInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async getAllBlogs(res: Response): Promise<Response> {
    try {
      const blogs = await this.blogModel.find({});
      return res.status(200).json(blogs);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  }

  async getBlogsById(res: Response, { id }): Promise<Response> {
    try {
      const blogs = await this.blogModel.findById(
        new mongoose.Types.ObjectId(id),
      );
      console.log(blogs);
      return res.status(200).json(blogs);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  async postBlogs(res: Response, post: PostDto): Promise<Response> {
    const { postedby, title, description, body, category, imgurlblog } = post;

    const userinfo = await this.userModel.findById(
      new mongoose.Types.ObjectId(postedby),
    );

    const { fullname, imgurl } = userinfo;

    try {
      await this.blogModel.create({
        postedby: new mongoose.Types.ObjectId(postedby),
        title,
        description,
        body,
        category,
        imgurlblog,
        fullname,
        imgurl,
      });
      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async deleteBlogs(res: Response, { id }): Promise<Response> {
    try {
      await this.blogModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
      return res.sendStatus(200);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
}
