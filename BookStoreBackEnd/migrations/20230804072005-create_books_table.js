'use strict';

const { generateRandomBookData } = require('../mocks/bookMocks');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      writer: {
        type: Sequelize.STRING
      },
      cover_image: {
        type: Sequelize.STRING
      },
      point: {
        type: Sequelize.INTEGER
      },
      tag: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Insert the book data into the 'books' table
    await queryInterface.bulkInsert('books', generateRandomBookData(5000), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};
