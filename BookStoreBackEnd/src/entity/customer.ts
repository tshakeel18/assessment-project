import { Sequelize } from 'sequelize';

const { DataTypes, Model } = require('sequelize');

 export class Customer extends Model {
  static init(sequelize:Sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        points: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 100,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'customer',
      }
    );
  }
}

