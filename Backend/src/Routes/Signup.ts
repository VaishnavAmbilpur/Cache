import { model } from "mongoose";
import { UserModel } from "../db";
const signup = async(req : any ,res:any )=>{
     const { name, email, password } = req.body;
     try{
        const check = await UserModel.findOne({ email: email , username: name });
        if(check){return res.status(403).send("User already exists with this email or username");}
        const newUser = await UserModel.create({
            username: name,
            email: email,
            password: password
        });
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
     }catch(err){
        res.status(411).send("Error creating user: " + err);
     }
}
export default signup;