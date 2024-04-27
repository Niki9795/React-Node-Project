import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'to-do-database',
    user: 'postgres',
    password: 'password',
});

export async function connectDatabase() {
    try {
        await client.connect();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

export async function closeDatabase() {
    try {
        await client.end();
    } catch (error) {
        console.error('Error closing the database connection:', error);
        throw error;
    }
}

export { client };
export default client;