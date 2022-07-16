import mongoose from 'mongoose';

export interface BlogInterface {
  readonly id?: string;
  readonly postedby: mongoose.Types.ObjectId;
  readonly title: String;
  readonly description: string;
  readonly body: string;
  readonly category?: string;
  readonly imgurlblog?: string;
  readonly fullname: string;
  readonly imgurl?: string;
}
