import { Response } from 'express';
import { Model } from 'mongoose';
import { BlogInterface } from 'src/blog/interface/blog.interface';
import { RegisterDto, LoginDto, ProfileDto } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';
export declare class UserService {
    private readonly userModel;
    private readonly blogModel;
    constructor(userModel: Model<UserInterface>, blogModel: Model<BlogInterface>);
    register(res: Response, register: RegisterDto): Promise<Response>;
    login(res: Response, login: LoginDto): Promise<Response>;
    authorise(res: Response, { authorization }: {
        authorization: any;
    }): Promise<Response>;
    profileEdit(res: Response, profile: ProfileDto): Promise<Response>;
    profileGet(res: Response, { postedby }: {
        postedby: any;
    }): Promise<Response>;
}
