import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { ServeStaticModule } from '@nestjs/serve-static';
const path = require('path');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'client/build'),
    }),
    UserModule,
    BlogModule,
    MongooseModule.forRoot(
      'mongodb+srv://shrestha_7001:Sensei.20030908@cluster0.xlj7p.mongodb.net/BlogSansar?retryWrites=true&w=majority' ||
        process.env.MONGODB_URI,
    ),
  ],
})
export class AppModule {}
