import { Sequelize } from 'sequelize';

const { DataTypes, Model } = require('sequelize');

export class Order extends Model {
  static init(sequelize:Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        customerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'order',
      }
    );
  }
}

