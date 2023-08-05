import {Order} from '../entity/order';

export default class OrderRepository {
  static createOrder = async (orderData: Order) => {
    return Order.create(orderData);
  }
  
  static cancelOrder = async (orderId: number) => {
    return Order.destroy({ where: { id: orderId } });
  }
  
  static updateOrder = async (orderId: number, status: string) => {
    return Order.update({status},{ where: { id: orderId } });
  }
  
  static getOrdersByCustomer = async (customerId: number) => {
    return Order.findAll({ where: { customerId } });
  }
}

