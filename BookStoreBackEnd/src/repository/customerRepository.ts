import { Transaction } from 'sequelize';
import  {Customer} from '../entity/customer';

export default class CustomerRepository {

  static createCustomer = async (customerData: Customer) => {
      return Customer.create(customerData);
  }

  static authenticateCustomer = async (credentials: Customer) => {
    const { name, password } = credentials;
    const customer = await Customer.findOne({ where: { name, password } });
    
    if (!customer || customer.password !== password) {
      throw new Error('Invalid name or password');
    }
    
    return customer;
  }

  static findByCustomer = async (userId: string, transaction: Transaction) => {
    return await Customer.findByPk(userId, { transaction });
  }
}
