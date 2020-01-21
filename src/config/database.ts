import MongoClient from 'mongodb';
import chalk from 'chalk';


class Database {

    async init() {
        const MONGODB = String(process.env.DATABASE);
        const client = await MongoClient.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = await client.db();

        if (client.isConnected()) {
            console.log('DATABASE', chalk.greenBright('ONLINE'), db.databaseName.toUpperCase())
        }

        return db;
    }
}

export default Database;