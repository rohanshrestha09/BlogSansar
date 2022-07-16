import { Response } from 'express';
import { LoginDto, ProfileDto, RegisterDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(res: Response, register: RegisterDto): Promise<Response>;
    login(res: Response, login: LoginDto): Promise<Response>;
    authorise(res: Response, headers: any): Promise<Response>;
    profileEdit(res: Response, profile: ProfileDto): Promise<Response>;
    profileGet(res: Response, param: any): Promise<Response<any, Record<string, any>>>;
}
