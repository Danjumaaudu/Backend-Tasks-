import  jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export function generateToken(payload: object): string{
   return jwt.sign(payload, secret, {expiresIn: "1h"});
}

export function verifyToken(token:string) {
    return jwt.verify(token, secret);
}
