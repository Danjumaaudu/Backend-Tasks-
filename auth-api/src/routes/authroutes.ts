import express from "express";
import {register,login, logout, deleteuser} from "../controllers/auth-controllers";
import { authenticatetoken, AuthRequest } from "../middlewares/authMiddleware";
import User from "../database/models/userModel"

const router = express.Router();

router.post("/register", register)
router.post("/login",login)
router.post("/logout", logout)
router.delete("/delete",authenticatetoken,deleteuser)
router.get("/profile",authenticatetoken,(req:AuthRequest,res)=>{
    res.status(201).json({
        Message: "Welcome prestigous one",
        user:req.user,
    })
})
router.put("/profile", authenticatetoken, async (req: AuthRequest, res): Promise<void> => {
    const userId = req.user.id;
    const { username, email, phoneNumber } = req.body;
  
    if (!username && !email && !phoneNumber) {
        res.status(400).json({ message: "Please provide data to update." });
        return;
    }
  
    try {
      const user = await User.findById(userId);
      if (!user)  {res.status(404).json({ message: "User not found" });
                  return;
                }
  
      if (username) user.username = username;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
  
      await user.save();
  
      res.status(200).json({
        message: "Profile updated successfully",
        updatedUser: user,
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Something went wrong",
        error: err.message,
      });
    }
  });
  

export default router