import { MongoClient } from "mongodb";
import { DATABASE_URL } from "../env/env-vars"


const url = DATABASE_URL!; // Строка подключения к MongoDB.

if (!DATABASE_URL) { // Сообщить, если не удалось получить ссылку на базу данных.
    throw new Error("DATABASE_URL is not set");
}

const client = new MongoClient(url); // Клиент подключения к MongoDB.

/**
 * Попытаться подключиться к базе данных.
 */
async function connect_to_db() {
    try {
        await client.connect();
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error('Error connect to MongoDB.', error);
    }
}

/**
 * Закрыть соединение к базе данных.
 */
async function close_connection() {
    await client.close();
    console.log('Connection closed.'); // Сообщить о закрытии соединения.
}

/**
 * Получить игры из базы данных.
 */
export async function get_games() {

    await connect_to_db();

    const collection = client.db('steamdb').collection('steamdb');

    const cursor = collection.find();

    for await (const doc of cursor) {
        console.log(doc);
    }

    await close_connection();

}


