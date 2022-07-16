import * as mongoose from 'mongoose';
export declare const BlogSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    postedby: typeof mongoose.Types.ObjectId;
    title: string;
    description: string;
    body: string;
    category: string;
    imgurlblog: string;
    fullname: string;
    imgurl?: string;
}>;
