import client from './db.js';

export async function createTableUsers() {
    try {
        const query = `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            verification_token VARCHAR(255),
            is_verified BOOLEAN DEFAULT false,
            CONSTRAINT unique_email UNIQUE(email)
        );`;
        await client.query(query);
        console.log('Table users created successfully');
    } catch (error) {
        console.error('Error creating table users', error);
        throw error;
    }
}