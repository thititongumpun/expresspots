import { BaseController } from "@expressots/core";
import { Response } from "express";
import { AppUseCase } from "./app.usecase";
import { KafkaUseCase } from "@useCases/kafka/kafka.usecase";
import {
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
  response,
} from "inversify-express-utils";
import { body } from "@expressots/adapter-express";

@controller("/")
export class AppController extends BaseController {
  constructor(private appUseCase: AppUseCase, private kafkaUseCase: KafkaUseCase) {
    super();
  }

  @httpGet("/")
  execute(@response() res: Response) {
    return res.send(this.appUseCase.execute());
  }

  @httpPost("kafka")
  async produceKafka(@body() req: { tag: string }, @response() res: Response) {
    const { tag } = req;
    await this.kafkaUseCase.execute(tag);
    return res.json({
      'status': 200,
      'message': 'success'
    });
  }
}
