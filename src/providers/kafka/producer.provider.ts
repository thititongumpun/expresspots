import ENV from 'env';
import { provide } from 'inversify-binding-decorators';
import { CompressionTypes, Kafka, Partitioners, Producer } from 'kafkajs';

export interface KafkajsProducer {
  connect(): Promise<void>;
  produce(): Promise<void>;
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

  async produce(): Promise<void> {

    await this.producer.send({
      topic: 'devto',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
      acks: -1,
      compression: CompressionTypes.GZIP,
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