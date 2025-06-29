import { UserModel } from "../db";
import { SECRET } from "../Config";
import jwt from 'jsonwebtoken';
const auth = async (req:any,res:any,next:any)=>{
     const token = req.headers.token;
     try{
         const decoded = jwt.verify(token as string, SECRET);
      if (decoded) {
        // @ts-ignore
        req.userId = decoded.id; // Store the decoded user ID for later use in request handling.
        next(); // Call the next middleware or route handler.
      } else {
        // If the token is invalid, send a 401 Unauthorized response.
        res.status(401).json({ message: "Unauthorized User" });
     }
     }catch(err){
        res.status(500).send("Error in auth");
     }
}
export default auth;