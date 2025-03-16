import {  userService } from "@src/services";
import {  UsersController } from "./user.controller";

export const usersController: UsersController = new UsersController(userService);
