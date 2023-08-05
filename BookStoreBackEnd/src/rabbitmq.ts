import * as amqp from 'amqplib';

const queueName = 'order_queue';

const setupRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    console.log('RabbitMQ setup completed.');

    return channel;
  } catch (error) {
    console.error('Error setting up RabbitMQ:', error);
    throw error;
  }
};

export { setupRabbitMQ, queueName };