import { Request,Response } from "express";
import { users,user} from "../database/models/auth-Models";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs";
import User from "../database/models/userModel";
import { AuthRequest } from "../middlewares/authMiddleware";

let userid = 1;

export const register = async (req:Request, res:Response) => {
  try 
    {const {username,password,email,phoneNumber} = req.body;
    const existingUser = await User.findOne({username});
    if (existingUser) {
       res.status(400).json({ message: "User already exists" });
       return;
    }

  
    const salt = await bcrypt.genSaltSync(10);
    const hashedpassword =await bcrypt.hash(password,salt);

    const newUser = await User.create({
      username,
      password:hashedpassword,
      email,
      phoneNumber

    })
    
    const token = generateToken({
      id:newUser._id, username:newUser.username
    });
    res.status(201).json({user:newUser,token})
} catch (err) {
    console.error(err);
    res.status(501).json({Message:" server error"})
}
};
 
export const login = async (req:Request, res:Response) =>{
  try
  { const {username,password} = req.body
  const user = await User.findOne({username });
  if(!user) {
    res.status(401).json({message : "invalid Essentials"});
    return;
  }
   const isMatch = await bcrypt.compare(password, user.password)
   if(!isMatch) {
    res.status(401).json({Message : "invalid password"});
    return;
   }
  const token = generateToken({
    id:user.id,username:user.username
  })
  res.status(201).json({user,token})
} catch(err){
   console.error(err);
   res.status(501).json({Message: "Server error"})
}
}
export  const deleteuser = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if(!userId){
    res.status(400).json({Message: "user ID not found"});
    return;
  } 
  try{
    const user = await User.findByIdAndDelete(userId);
    if(!user){
      res.status(404).json({Message:"User not found"});
      return;
    }
    res.status(200).json({Message:"user deleted successfully"})
  }
    catch(err){
      console.error(err);
      res.status(500).json({Message: "something went wrong"})
    }
}

export const logout = async (req:Request, res:Response) => {
    res.status(200).json({Message:"logout successfully"});
    return;
}