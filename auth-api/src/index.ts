import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000 ;

app.use(express.json())
app.use("/routes/authroutes", authRoutes)

app.listen(port, ()=> {
    console.log (`server is running on port ${port}`);
})

