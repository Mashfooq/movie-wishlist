import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

// Database connection configuration
const sequelize = new Sequelize({
    dialect: process.env.DB_USER,
    dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? true : false,
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Test the database connection
const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { testDatabaseConnection, sequelize };
