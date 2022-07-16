"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchema = void 0;
const mongoose = require("mongoose");
exports.BlogSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
//# sourceMappingURL=blog.schema.js.map