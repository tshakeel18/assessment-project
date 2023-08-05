import { Order } from '../entity/order';
import OrderRepository from '../repository/orderRepository';

export default class OrderService {

  static createOrder = async (orderData: Order) => {
    return OrderRepository.createOrder({
      customerId: orderData.customerId,
      bookId: orderData.bookId,
      status: 'processing'
    });
  };

  static cancelOrder = async (orderId: number) => {
    return OrderRepository.cancelOrder(orderId);
  };

  static updateOrder = async (orderId: number, status: string) => {
    return OrderRepository.updateOrder(orderId, status)
  }

  static getOrdersByCustomer = async (customerId: number) => {
    return OrderRepository.getOrdersByCustomer(customerId);
  }
}