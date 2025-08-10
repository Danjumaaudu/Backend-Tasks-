"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogControllers_1 = require("../controllers/blogControllers");
const routes = express_1.default.Router();
routes.post("/create", blogControllers_1.createBlog);
routes.get("/blogs", blogControllers_1.getallblogs);
routes.get("/blog/:id", blogControllers_1.getsingleBlog);
routes.delete("/:id", blogControllers_1.deleteblog);
routes.put("/update/:id", blogControllers_1.Updateblog);
exports.default = routes;
