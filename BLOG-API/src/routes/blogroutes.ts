import express from "express";
import { createBlog, deleteblog, getallblogs, getsingleBlog, Updateblog } from "../controllers/blogControllers";


const routes = express.Router();

routes.post("/create",createBlog);

routes.get("/blogs", getallblogs);
routes.get("/blog/:id", getsingleBlog);
routes.delete("/:id", deleteblog);
routes.put("/update/:id", Updateblog);

 export default routes