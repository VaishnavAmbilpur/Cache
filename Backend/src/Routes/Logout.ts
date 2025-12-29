import { model } from "mongoose";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../db";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
import { SECRET } from "../Config";
import { NextFunction } from "express";

const Logout = async (req: any, res: any ) => {
  return res.status(200).json({ message: "Logged out successfully" });
}

export default Logout;

