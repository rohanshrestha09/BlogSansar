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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const blog_dto_1 = require("./dto/blog.dto");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    getAllBlogs(res) {
        return this.blogService.getAllBlogs(res);
    }
    getblogsbyId(res, param) {
        return this.blogService.getBlogsById(res, param);
    }
    postBlogs(res, post) {
        return this.blogService.postBlogs(res, post);
    }
    deleteblogs(res, param) {
        return this.blogService.deleteBlogs(res, param);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllBlogs", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getblogsbyId", null);
__decorate([
    (0, common_1.Post)('post'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, blog_dto_1.PostDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "postBlogs", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteblogs", null);
BlogController = __decorate([
    (0, common_1.Controller)('api/blogs'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map