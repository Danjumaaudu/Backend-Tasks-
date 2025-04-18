import {Request, Response, NextFunction, } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticatetoken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        res.status(401).json({Message: "no token was provided"});
        return ;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {res.status(403).json({Message:"invalid token"})
            return;}
        req.user = user;
        next();
    });
};