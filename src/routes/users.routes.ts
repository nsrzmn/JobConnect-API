import { Router, Request, Response } from "express";
import { usersController } from "../controllers";

export const usersRouter: Router = Router();

usersRouter.post("/register", (...args: [Request, Response]) =>
  usersController.register(...args)
);
