import { BaseController } from "@expressots/core";
import { Response } from "express";
import { AppUseCase } from "./app.usecase";
import { Get, controller, response } from "@expressots/adapter-express";

@controller("/")
export class AppController extends BaseController {
    constructor(private appUseCase: AppUseCase) {
        super();
    }

    @Get("/")
    execute(@response() res: Response) {
        return res.send(this.appUseCase.execute());
    }

    @Get("test")
    getTest(@response() res: Response) {
      return res.json(this.appUseCase.getTest());
    }
}
