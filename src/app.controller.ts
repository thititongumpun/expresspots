import { BaseController } from "@expressots/core";
import { Response } from "express";
import { AppUseCase } from "./app.usecase";
import { Get, controller, response } from "@expressots/adapter-express";
import { KafkaUseCase } from "@useCases/kafka/kafka.usecase";

@controller("/")
export class AppController extends BaseController {
  constructor(private appUseCase: AppUseCase, private kafkaUseCase: KafkaUseCase) {
    super();
  }

  @Get("/")
  execute(@response() res: Response) {
    return res.send(this.appUseCase.execute());
  }

  @Get("test")
  async getTest(@response() res: Response) {
    await this.kafkaUseCase.execute();
    return res.json(this.appUseCase.getTest());
  }
}
