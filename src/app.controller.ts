import { BaseController } from "@expressots/core";
import { Response } from "express";
import { AppUseCase } from "./app.usecase";
import { Get, controller, response } from "@expressots/adapter-express";
import ENV from "./env";

@controller("/")
export class AppController extends BaseController {
  constructor(private appUseCase: AppUseCase) {
    super();
  }

  @Get("/")
  execute(@response() res: Response) {
    console.log(ENV.Application.PORT);
    // console.log(process.env.PORT);
    return res.send(this.appUseCase.execute());
  }

  @Get("test")
  getTest(@response() res: Response) {
    return res.json(this.appUseCase.getTest());
  }
}
