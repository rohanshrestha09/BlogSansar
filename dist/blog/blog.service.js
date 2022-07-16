"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BlogService = class BlogService {
    constructor(blogModel, userModel) {
        this.blogModel = blogModel;
        this.userModel = userModel;
    }
    async getAllBlogs(res) {
        try {
            const blogs = await this.blogModel.find({});
            return res.status(200).json(blogs);
        }
        catch (err) {
            return res.status(404).send(err.message);
        }
    }
    async getBlogsById(res, { id }) {
        try {
            const blogs = await this.blogModel.findById(new mongoose_2.default.Types.ObjectId(id));
            console.log(blogs);
            return res.status(200).json(blogs);
        }
        catch (error) {
            return res.status(404).json(error.message);
        }
    }
    async postBlogs(res, post) {
        const { postedby, title, description, body, category, imgurlblog } = post;
        const userinfo = await this.userModel.findById(new mongoose_2.default.Types.ObjectId(postedby));
        const { fullname, imgurl } = userinfo;
        try {
            await this.blogModel.create({
                postedby: new mongoose_2.default.Types.ObjectId(postedby),
                title,
                description,
                body,
                category,
                imgurlblog,
                fullname,
                imgurl,
            });
            return res.sendStatus(200);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }
    async deleteBlogs(res, { id }) {
        try {
            await this.blogModel.findByIdAndDelete(new mongoose_2.default.Types.ObjectId(id));
            return res.sendStatus(200);
        }
        catch (error) {
            return res.status(404).json(error.message);
        }
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Blogpost')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map