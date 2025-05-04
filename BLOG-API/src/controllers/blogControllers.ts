import {Request, Response} from "express";
import { BlogModel } from "../database/model/blogModel";
import mongoose from "mongoose";
import { error } from "console";
//create Logic
export const createBlog = async (req:Request, res:Response) => {
       try{
        const {
            title, content, author,tags
        } = req.body;
        if (!title||!content||!author||!tags){
            res.status(400).json({message: "Title,content,author,are required"});
            return;
        }
        const newBlogpost = await BlogModel.create({
           title,
           content,
           author,
           tags
        })
        res.status(201).json({message:" blog created successfully",data:newBlogpost});
        return;
       }catch(err){
        res.status(500).json({message:"unable to create post,something went wrong",err});
        return;
       }
};
//Logic to get all data in database
export const getallblogs = async(req:Request, res:Response) => {
    const page = parseInt(req.query.page as string)||1;
    const limit = parseInt(req.query.limit as string)||10;
    const skip = (page -1) * limit;

    try{
      const totalBlogs = await BlogModel.countDocuments()
      const blogs =  await BlogModel.find().sort({createdAt:-1}).skip(skip).limit(limit);
      if (!blogs||blogs.length===0) {
        res.status(404).json({message: "no blogs avaliable"});
        return;
      }
       res.status(200).json({message:"all blogs retrived successsfully",page, totalPages:Math.ceil(totalBlogs/limit), totalBlogs,data: blogs});
       return;
      
    } catch(err){
        res.status(500).json({message:"something went wrong"})
        return;
    }

};

//Logic to get single data from database
export const getsingleBlog = async(req:Request, res:Response)=> {
    const blogID = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(blogID)){
        res.status(400).json({message:"invalid blog format"})
        return;
    }
    try{
       const blog = await BlogModel.findById(blogID);
       if(!blog){
        res.status(401).json({message:"blog not found"});
        return;
       }
      
       res.status(200).json({message:"blog retrieved successfully", data:blog});
       return;
    }
    catch(err){
        res.status(500).json({message:"something went wrong", error:err});
        return;
    }
};
//delete logic 
export const deleteblog = async(req:Request, res: Response) => {
       const blogID = req.params.id;
       try
     {   const blogid = await BlogModel.findByIdAndDelete(blogID)
         if(!blogid){
        res.status(404).json({message:"id not found"});
        return
       };
       res.status(200).json({message:"Blog deleted successfully"});
       return
    } catch(err){
        res.status(500).json({message: "something went wrong", error:err});
        return;
    }
};


//update Logic
export const Updateblog = async(req:Request, res:Response) => {
    const blogID = req.params.id;
    const {
        title, content, author,tags
    } = req.body;
    if (!title&& !content&& !author && !tags){
        res.status(400).json({message: "Provide details for update"});
        return;
    }
    try{
        const Blog = await BlogModel.findByIdAndUpdate(blogID,{
            title,content,author,tags
        },{
            new:true, runValidators:true
        });
        if(!Blog) {
            res.status(404).json({message:"no blog found"});
            return;
        }
        res.status(200).json({message: " Updated successfully", data:Updateblog});
        return;
    }
    catch(err){
        res.status(500).json({message:"internal server error", error:err});
        return;
    }
}