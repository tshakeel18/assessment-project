import { Sequelize } from 'sequelize';

import {Book} from './book';
import {Customer} from './customer';
import {Order} from './order';

export const setupAssociations = (sequelize:Sequelize) => {
  Book.init(sequelize);
  Customer.init(sequelize);
  Order.init(sequelize);

  Book.belongsToMany(Customer, { through: Order });
  Customer.belongsToMany(Book, { through: Order });
};

