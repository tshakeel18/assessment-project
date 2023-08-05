import { Sequelize } from 'sequelize';

// Load the database configuration from config/config.json
const env = process.env.NODE_ENV || 'development';
const config = require( '../../config/config.json')[env];

// Create a new Sequelize instance with the loaded configuration
export const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Test the database connection and run migrations
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();