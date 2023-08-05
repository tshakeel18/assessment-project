
import  * as express from 'express';

import OrderService from '../service/orderService';
import { authenticateToken } from '../authentication/authVerification';
import { setupRabbitMQ, queueName } from '../rabbitmq';
import { Order } from '../entity/order';

export const router = express.Router();

router.post('/orders',  authenticateToken, async (req, res) => {
  try {
    const newOrder:Order = await OrderService.createOrder(req.body);

    const channel = await setupRabbitMQ();
    channel.sendToQueue(queueName, Buffer.from(newOrder.id.toString()), { persistent: true });

    res.status(201).json(newOrder);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error creating order' });
  }
});

router.delete('/orders/:id',  authenticateToken, async (req, res) => {
  const orderId = req.params.id;
  try {
    await OrderService.cancelOrder(Number(orderId));
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error canceling order' });
  }
});

router.get('/orders/:customerId',  authenticateToken, async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const orders = await OrderService.getOrdersByCustomer(Number(customerId));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving orders' });
  }
});
