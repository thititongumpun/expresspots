import ENV from 'env';
import { Articles } from '@useCases/kafka/message.dto';
import { provide } from 'inversify-binding-decorators';
import { CompressionTypes, Kafka, Message, Partitioners, Producer, TopicMessages } from 'kafkajs';

export interface KafkajsProducer {
  connect(): Promise<void>;
  produce(tag: string, messages: Articles[]): Promise<void>;
  disconnect(): Promise<void>;
}

@provide(KafkaProvider)
export class KafkaProvider implements KafkajsProducer {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer()
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  async produce(tag: string, messages: Articles[]): Promise<void> {
    const kafkaMessages: Message[] = messages.map((message) => {
      return {
        key: tag,
        value: JSON.stringify(message)
      }
    })

    const topicMessages: TopicMessages = {
      topic: 'devto',
      messages: kafkaMessages
    }

    await this.producer.sendBatch({
      topicMessages: [topicMessages],
      acks: -1,
      compression: CompressionTypes.GZIP
    })
  }

  async disconnect(): Promise<void> {
    return await this.producer.disconnect()
      .catch(e => console.log(`Error on disconnect ${e}`));
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      brokers: [ENV.Broker.BROKER_URL],
      sasl: {
        mechanism: 'scram-sha-256',
        username: ENV.Broker.BROKER_USERNAME,
        password: ENV.Broker.BROKER_PASSWORD,
      },
      ssl: true,
    })

    return kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
      idempotent: true,
      maxInFlightRequests: 5,
    })
  }
}