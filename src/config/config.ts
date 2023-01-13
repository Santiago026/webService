import dotenv from 'dotenv';
dotenv.config();

// const dbUser = process.env.MONGO_USERNAME || '';
// const dbPass = process.env.MONGO_PASSWORD || '';
const dbHost = process.env.MONGO_URL || '';
// const dbName = process.env.MONGO_DB || '';

// const mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbMongo}`;

const serverPort = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 27017;

export const config = {
    mongo: {
        // username: dbUser,
        // password: dbPass,
        url: dbHost,
        // dbName: dbName 
    },
    server: {
        port: serverPort
    },
    api: {
        prefix: '/api/v1',
    }
};



