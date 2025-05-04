import mongoose from "mongoose";
import { BlogModel } from "../database/model/blogModel";
import dotenv from "dotenv";

dotenv.config();

const dummyData = [
    {
        title:"first dummy post",
        content: "this is just me improving my skills and challenging myself",
        author:"danj",
        tags:[ "first-post","typescript"]
    },
    {
        title:" is backend the future of tech?",
        content:"this post talks about the nuke and cranies of tech and the dark side of the startup industries",
        author:"Danese",
        tags: ["backend","typescript"]
    }
]

const blogseeds = async() => {
    try{
        await mongoose.connect(process.env.DB as string)
        console.log("connected to database");

        await BlogModel.deleteMany({});
        const result = await BlogModel.insertMany(dummyData);

        console.log(`seeded ${result.length} blog posts successfully`);
    }
    catch(err){
        console.error("seeding Failed", err);
    } finally{
 await mongoose.disconnect();
 console.log("disconnect from DB")
    }
}

blogseeds();