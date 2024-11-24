import { MongoClient } from "mongodb";
import { DATABASE_URL } from "../env/env-vars"

/**
 * Получить игры из базы данных.
 */
export async function get_games() {

    if (!DATABASE_URL) {
        throw new Error("DATABASE_URL is not ");
    }

    const url = DATABASE_URL; // Строка подключения к MongoDB.

    const client = new MongoClient(url); // Клиент подключения к MongoDB.

    await client.connect();

    const collection = client.db('steamdb').collection('steamdb');

    const cursor = collection.find();

    for await (const doc of cursor) {
        console.log(doc);
    }

    client.close();

}


