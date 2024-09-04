import { Sequelize } from "sequelize";
import pg from 'pg';

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    dialectModule: pg,
    logging: false
});

// Test the connection
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();

export default sequelize;