import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const excludeUrls = [ "/register", "/login" ];

export const authentificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log( req.url );
    
    if (excludeUrls.includes(req.url)) {
      return next();
    }

    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    console.log( "token: ",token );
    
    if (!token || token === "") {
      return res.status(401).json({ message: "No token provided!" });
    }

    if( !process.env.JWT_SECRET ){
      return res.status(401).json({ message: "Set JWT Secrect First" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET) ;
    req.body.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "The token is invalid or expired" });
  }
};
