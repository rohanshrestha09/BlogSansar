import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    fullname: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    imgurl: string;
}>;
