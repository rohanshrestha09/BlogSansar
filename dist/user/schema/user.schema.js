"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        minLength: [5, 'Username must contain atleast 5 characters'],
        maxLength: [9, 'Username must not exceed 9 characters'],
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email',
        ],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must contain atleast 8 characters'],
        select: false,
    },
    bio: {
        type: String,
        default: 'Follow me so that I can keep you guys interested with my daily blogs.',
    },
    imgurl: {
        type: String,
        default: 'https://th.bing.com/th/id/OIP.hN93wSa2UbBZe9hnC3BYnAHaHa?pid=ImgDet&rs=1',
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=user.schema.js.map