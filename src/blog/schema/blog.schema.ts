import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    postedby: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Others',
    },
    imgurlblog: {
      type: String,
      default: '',
    },
    fullname: {
      type: String,
      required: true,
    },
    imgurl: String,
  },
  {
    timestamps: true,
  },
);
