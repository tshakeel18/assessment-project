import { Sequelize } from 'sequelize';

const { DataTypes, Model } = require('sequelize');

export class Book extends Model {
  static init(sequelize:Sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        writer: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cover_image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        point: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tag: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },        
        discount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'book',
      }
    );
  }
}
