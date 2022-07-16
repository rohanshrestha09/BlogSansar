import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Headers,
  Put,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDto, ProfileDto, RegisterDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(
    @Res() res: Response,
    @Body() register: RegisterDto,
  ): Promise<Response> {
    return this.userService.register(res, register);
  }

  @Post('login')
  login(@Res() res: Response, @Body() login: LoginDto): Promise<Response> {
    return this.userService.login(res, login);
  }

  @Get('authorise')
  authorise(@Res() res: Response, @Headers() headers): Promise<Response> {
    return this.userService.authorise(res, headers);
  }

  @Put('profile')
  profileEdit(
    @Res() res: Response,
    @Body() profile: ProfileDto,
  ): Promise<Response> {
    return this.userService.profileEdit(res, profile);
  }

  @Get('profile/:postedby')
  profileGet(@Res() res: Response, @Param() param) {
    return this.userService.profileGet(res, param);
  }
}
