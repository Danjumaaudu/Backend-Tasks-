"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updateblog = exports.deleteblog = exports.getsingleBlog = exports.getallblogs = exports.createBlog = void 0;
const blogModel_1 = require("../database/model/blogModel");
const mongoose_1 = __importDefault(require("mongoose"));
//create Logic
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author, tags } = req.body;
        if (!title || !content || !author || !tags) {
            res.status(400).json({ message: "Title,content,author,are required" });
            return;
        }
        const newBlogpost = yield blogModel_1.BlogModel.create({
            title,
            content,
            author,
            tags
        });
        res.status(201).json({ message: " blog created successfully", data: newBlogpost });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "unable to create post,something went wrong", err });
        return;
    }
});
exports.createBlog = createBlog;
//Logic to get all data in database
const getallblogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const totalBlogs = yield blogModel_1.BlogModel.countDocuments();
        const blogs = yield blogModel_1.BlogModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        if (!blogs || blogs.length === 0) {
            res.status(404).json({ message: "no blogs avaliable" });
            return;
        }
        res.status(200).json({ message: "all blogs retrived successsfully", page, totalPages: Math.ceil(totalBlogs / limit), totalBlogs, data: blogs });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" });
        return;
    }
});
exports.getallblogs = getallblogs;
//Logic to get single data from database
const getsingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogID = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(blogID)) {
        res.status(400).json({ message: "invalid blog format" });
        return;
    }
    try {
        const blog = yield blogModel_1.BlogModel.findById(blogID);
        if (!blog) {
            res.status(401).json({ message: "blog not found" });
            return;
        }
        res.status(200).json({ message: "blog retrieved successfully", data: blog });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err });
        return;
    }
});
exports.getsingleBlog = getsingleBlog;
//delete logic 
const deleteblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogID = req.params.id;
    try {
        const blogid = yield blogModel_1.BlogModel.findByIdAndDelete(blogID);
        if (!blogid) {
            res.status(404).json({ message: "id not found" });
            return;
        }
        ;
        res.status(200).json({ message: "Blog deleted successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong", error: err });
        return;
    }
});
exports.deleteblog = deleteblog;
//update Logic
const Updateblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogID = req.params.id;
    const { title, content, author, tags } = req.body;
    if (!title && !content && !author && !tags) {
        res.status(400).json({ message: "Provide details for update" });
        return;
    }
    try {
        const Blog = yield blogModel_1.BlogModel.findByIdAndUpdate(blogID, {
            title, content, author, tags
        }, {
            new: true, runValidators: true
        });
        if (!Blog) {
            res.status(404).json({ message: "no blog found" });
            return;
        }
        res.status(200).json({ message: " Updated successfully", data: exports.Updateblog });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", error: err });
        return;
    }
});
exports.Updateblog = Updateblog;
