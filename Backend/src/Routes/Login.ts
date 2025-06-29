import { model } from "mongoose";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../db";
const SECRET = "12345";
const Login = async(req : any ,res:any )=>{
     const { name, email, password } = req.body;
     try{
        const check = await UserModel.findOne({ email: email , username: name ,password: password});
        if (!check) {
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