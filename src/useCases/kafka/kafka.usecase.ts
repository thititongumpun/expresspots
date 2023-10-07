import { KafkaProvider } from "@providers/kafka/producer.provider";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(KafkaUseCase)
export class KafkaUseCase {
  @inject(KafkaProvider)
  private kafkajs: KafkaProvider;

  async execute() {
    await this.kafkajs.connect();
    await this.kafkajs.produce();
    await this.kafkajs.disconnect();
  }
}
