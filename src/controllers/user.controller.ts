
import { UsersService } from "@src/services/users.service";
import { Request, Response } from "express";

export class UsersController {
  /**
   * @param __service
   */

  public constructor(public __service: UsersService) {}
  /**
   *
   * @param req
   * @param res
   * @param next
   */

  public register = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      let message = "users function executed.";
      // const data = await usersFunctionSchema.validateAsync(body);
      const response: any = await this.__service.register(body);

      res.status(200).json({
        statusCode: 200,
        message,
        response,
      });
    } catch (error: any) {
      res.status(403).send({
        statusCode: 403,
        message: error.message,
      });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      let message = "user login function executed.";
      // const data = await usersFunctionSchema.validateAsync(body);
      const response: any = await this.__service.login(req.body.user);

      res.status(200).json({
        statusCode: 200,
        message,
        response,
      });
    } catch (error: any) {
      res.status(403).send({
        statusCode: 403,
        message: error.message,
      });
    }
  };
}
