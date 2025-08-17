import { model } from "mongoose";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../db";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
import { SECRET } from "../Config";
const Login = async(req : any ,res:any )=>{
     const { name, email, password } = req.body;
     try{
        const check = await UserModel.findOne({ email: email , username: name });
        if (!check || !check.password) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, check.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const generateToken = ():string => { return jwt.sign({ id: check._id }, SECRET); }
        const token = generateToken();
        res.status(200).json({
            message: "User Loggedin successfully",
            user: {
                token
            }
        });
     }catch(err){
        res.status(401).send("Error creating user: " + err);
     }
}
export default Login;