import { Request,Response } from "express";
import { users,user} from "../../models/auth-Models";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs";

let userid = 1;

export const register = (req:Request, res:Response) => {
    const {username,password,email,phoneNumber} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword =bcrypt.hashSync(password,salt)
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
       res.status(400).json({ message: "User already exists" });
       return;
    }

    const newUser: user = { id: userid++, username, password:hashedpassword,email,phoneNumber };
    users.push(newUser);
    
    const token = generateToken({
      id:newUser.id, username:newUser.username
    });
    res.status(201).json({user:newUser,token})
}
 
export const login = (req:Request, res:Response) =>{
  const {username,password} = req.body
  const user = users.find(u=>u.username=== username );
  if(!user) {
    res.status(401).json({message : "invalid Essentials"});
    return;
  }
   const isMatch = bcrypt.compareSync(password, user.password)
   if(!isMatch) {
    res.status(401).json({Message : "invalid password"});
    return;
   }
  const token = generateToken({
    id:user.id,username:user.username
  })
  res.status(201).json({user,token})
}