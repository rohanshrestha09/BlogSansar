import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogSchema } from './schema/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blogpost', schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
