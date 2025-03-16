import { Router, Request, Response } from "express";
import { usersController } from "../controllers";

export const usersRouter: Router = Router();

usersRouter.post("/register", (...args: [Request, Response]) =>
  usersController.register(...args)
);

usersRouter.post("/login", (...args: [Request, Response]) =>
  usersController.login(...args)
);

usersRouter.get("/user", (...args: [Request, Response]) =>
  usersController.getUserProfile(...args)
);
