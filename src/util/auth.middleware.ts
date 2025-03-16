import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authentificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer","");
    if (!token || token === "") {
      return res.status(401).json({ message: "No token provided!" });
    }

    if( !process.env.JWT_SECRET ){
      return res.status(401).json({ message: "The token is invalid or expired" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string, email: string };
    req.body.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "The token is invalid or expired" });
  }
};
