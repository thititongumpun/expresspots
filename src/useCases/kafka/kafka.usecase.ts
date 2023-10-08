import { KafkaProvider } from "@providers/kafka/producer.provider";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { Articles } from "./message.dto";
import axios from "axios";

@provide(KafkaUseCase)
export class KafkaUseCase {
  @inject(KafkaProvider)
  private kafkajs: KafkaProvider;

  async execute(tag: string) {
    await this.kafkajs.connect();

    const request = `https://dev.to/api/articles?per_page=10&top=1`;

    const { data } = await axios.get<Articles[]>(`${request}?tag=${tag}`);
    await this.kafkajs.produce(tag, data);

    await this.kafkajs.disconnect();
  }
}
