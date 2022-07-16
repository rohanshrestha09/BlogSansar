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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let UserService = class UserService {
    constructor(userModel, blogModel) {
        this.userModel = userModel;
        this.blogModel = blogModel;
    }
    async register(res, register) {
        const { fullname, username, email, password, confirmpassword } = register;
        const userExists = await this.userModel.findOne({ username });
        if (userExists)
            return res.status(403).json(`${username} already exists`);
        if (password !== confirmpassword)
            return res.sendStatus(403);
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            const user = await this.userModel.create({
                fullname,
                username,
                email,
                password: hashedPassword,
            });
            const token = jwt.sign({ id: user._id }, 'youneed20yearstodecryptthis', {
                expiresIn: '90min',
            });
            return res.status(200).json(token);
        }
        catch (err) {
            return res.sendStatus(403);
        }
    }
    async login(res, login) {
        const { username, password } = login;
        const user = await this.userModel.findOne({ username }).select('+password');
        if (!user)
            return res.status(403).json('User doesnot exists');
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched)
            return res.status(403).json('Invalid Password');
        const token = jwt.sign({ id: user._id }, 'youneed20yearstodecryptthis', {
            expiresIn: '90min',
        });
        if (isMatched)
            return res.status(200).json(token);
    }
    async authorise(res, { authorization }) {
        let token;
        if (authorization.startsWith('Bearer'))
            token = authorization.split(' ')[1];
        if (!token)
            return res.status(400).json('Not authorized');
        try {
            const decoded = jwt.verify(token, 'youneed20yearstodecryptthis');
            const user = await this.userModel
                .findById(new mongoose_2.default.Types.ObjectId(decoded))
                .select('-password');
            if (!user)
                return res.status(404).json('Not found');
            return res.status(201).json(user);
        }
        catch (err) {
            return res
                .status(401)
                .json({ message: 'Not authorized', error: err.message });
        }
    }
    async profileEdit(res, profile) {
        const { id, fullname, username, email, bio, imgurl } = profile;
        const userExists = await this.userModel.findOne({ username });
        if (userExists)
            return res.status(403).json(`${username} already exists.`);
        try {
            await this.userModel.findByIdAndUpdate(new mongoose_2.default.Types.ObjectId(id), {
                fullname,
                username,
                email,
                bio,
                imgurl,
            });
            return res.sendStatus(200);
        }
        catch (error) {
            return res.status(403).json(error.message);
        }
    }
    async profileGet(res, { postedby }) {
        try {
            const postedData = await this.blogModel.find({
                postedby: new mongoose_2.default.Types.ObjectId(postedby),
            });
            return res.status(200).json(postedData);
        }
        catch (err) {
            return res.status(404).json(err.message);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Blogpost')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map