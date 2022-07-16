import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import mongoose, { Model } from 'mongoose';
import { BlogInterface } from 'src/blog/interface/blog.interface';
import { RegisterDto, LoginDto, ProfileDto } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    @InjectModel('Blogpost') private readonly blogModel: Model<BlogInterface>,
  ) {}

  async register(res: Response, register: RegisterDto): Promise<Response> {
    const { fullname, username, email, password, confirmpassword } = register;

    const userExists = await this.userModel.findOne({ username });

    if (userExists) return res.status(403).json(`${username} already exists`);

    if (password !== confirmpassword) return res.sendStatus(403);

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await this.userModel.create({
        fullname,
        username,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
        expiresIn: '90min',
      });
      return res.status(200).json(token);
    } catch (err) {
      return res.sendStatus(403);
    }
  }

  async login(res: Response, login: LoginDto): Promise<Response> {
    const { username, password } = login;

    const user = await this.userModel.findOne({ username }).select('+password');

    if (!user) return res.status(403).json('User doesnot exists');

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) return res.status(403).json('Invalid Password');

    const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
      expiresIn: '90min',
    });
    if (isMatched) return res.status(200).json(token);
  }

  async authorise(res: Response, { authorization }): Promise<Response> {
    let token: string;

    if (authorization.startsWith('Bearer')) token = authorization.split(' ')[1];

    if (!token) return res.status(400).json('Not authorized');

    try {
      const decoded: string = jwt.verify(token, process.env.TOKEN);

      const user = await this.userModel
        .findById(new mongoose.Types.ObjectId(decoded))
        .select('-password');

      if (!user) return res.status(404).json('Not found');

      return res.status(201).json(user);
    } catch (err: any) {
      return res
        .status(401)
        .json({ message: 'Not authorized', error: err.message });
    }
  }

  async profileEdit(res: Response, profile: ProfileDto): Promise<Response> {
    const { id, fullname, username, email, bio, imgurl } = profile;

    const userExists = await this.userModel.findOne({ username });

    if (userExists) return res.status(403).json(`${username} already exists.`);

    try {
      await this.userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
        fullname,
        username,
        email,
        bio,
        imgurl,
      });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(403).json(error.message);
    }
  }

  async profileGet(res: Response, { postedby }): Promise<Response> {
    try {
      const postedData = await this.blogModel.find({
        postedby: new mongoose.Types.ObjectId(postedby),
      });
      return res.status(200).json(postedData);
    } catch (err) {
      return res.status(404).json(err.message);
    }
  }
}
