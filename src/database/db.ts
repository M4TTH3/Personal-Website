import { Sequelize } from "sequelize";
import pg from 'pg';
import Email, { initEmail } from "@/models/Email";
import StravaStat, { initStravaStat } from "@/models/StravaStat";
import StravaToken, { initStravaToken } from "@/models/StravaToken";

type Db = {
    sequelize: Sequelize;
    Email: typeof Email;
    StravaStat: typeof StravaStat;
    StravaToken: typeof StravaToken;
};

let db: Promise<Db> | undefined;

// Created on first use rather than at import, so `next build` (which imports
// route modules) doesn't need a DATABASE_URL
const getDb = (): Promise<Db> => {
    db ??= init();
    return db;
};

const init = async (): Promise<Db> => {
    // Parsed here because Sequelize's own URI parsing uses the deprecated url.parse()
    const url = new URL(process.env.DATABASE_URL!);
    const sequelize = new Sequelize(
        decodeURIComponent(url.pathname.slice(1)),
        decodeURIComponent(url.username),
        decodeURIComponent(url.password),
        {
            host: url.hostname,
            port: url.port ? Number(url.port) : undefined,
            dialect: 'postgres',
            dialectModule: pg,
            logging: false
        }
    );

    initEmail(sequelize);
    initStravaStat(sequelize);
    initStravaToken(sequelize);

    // Test the connection
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await Email.sync();

    return { sequelize, Email, StravaStat, StravaToken };
};

export default getDb;
