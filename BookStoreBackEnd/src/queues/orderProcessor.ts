import * as amqp from 'amqplib';

import { queueName } from '../rabbitmq';
import OrderService from '../service/orderService';

export const processOrder = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (message) => {
      if (message !== null) {
        const orderId = parseInt(message.content.toString(), 10);
        console.log(`Processing order with ID: ${orderId}`);

        // Implement order processing logic here...
        // For example, update the order status to 'processed'
        await OrderService.updateOrder(orderId, 'completed');

        channel.ack(message);
      }
    });
  } catch (error) {
    console.error('Error processing order:', error);
  }
};
