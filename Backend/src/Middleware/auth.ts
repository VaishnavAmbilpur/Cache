import { UserModel } from "../db";
import { SECRET } from "../Config";
import jwt from 'jsonwebtoken';

const auth = async (req: any, res: any, next: any) => {
  // Get token from Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token as string, SECRET);
    if (decoded) {
      // @ts-ignore
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;