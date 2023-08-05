import * as jwt from 'jsonwebtoken';

import { Customer } from '../entity/customer.js';
import CustomerRepository from '../repository/customerRepository';

export default class CustomerService {
  static createCustomer = async(customerData: Customer) => {
    return CustomerRepository.createCustomer({
      name: customerData.name,
      points: customerData.points || 100,
      password: customerData.password,
    });
  }

  static authenticateCustomer = async (credentials: Customer) => {
    return CustomerRepository.authenticateCustomer(credentials)
  }

  static generateToken = (customer: Customer) => {
    const token = jwt.sign({ id: customer.id, name: customer.name }, 'secret_key', { expiresIn: '1h' });
    return token;
  }
}