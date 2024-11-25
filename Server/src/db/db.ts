import { MongoClient, Document } from "mongodb";
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
 * Получить все игры из базы данных.
 * @returns массив документов игр.
 */
export async function get_all_games() {
    await connect_to_db() // Подключиться к базе данных.
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const cursor = collection.find(); // Получить все записи из коллекции.
    const games =  await cursor.toArray();
    await close_connection(); // Закрыть сооединение к базе данных.
    return games; // Вернуть массив с записями игр.
}

/**
 * Получить игры из базы данных согласно пайплайну.
 * @param pipline пайплайн, согласно которому будут получены игры.
 * @returns массив документов игр.
 */
export async function get_games_by(pipline: Document[]) {
    // Пример запроса.
    // const pipline: Document[] = [
    //     {$match: {sid: 10}}
    // ];

    await connect_to_db() // Подключиться к базе данных.
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.

    const cursor = collection.aggregate(pipline); // Получить записи из коллекции согласно пайплайну.
    const games =  await cursor.toArray(); 

    await close_connection(); // Закрыть сооединение к базе данных.
    return games; // Вернуть массив с записями игр.
}

/**
 * Вставить один документ в БД.
 * @param doc документ, который будет вставлен в БД.
 * @returns успешность вставки.
 */
export async function insert_one(doc : Document) {
    await connect_to_db(); // Подключиться к базе данных.
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.insertOne(doc); // Создать документ в БД.
    await close_connection(); // Закрыть сооединение к базе данных.
    return result; // Вернуть результат вставки.
}

/**
 * Вставить несклько документов в БД.
 * @param doc документы, которые будут вставлены в БД.
 * @returns успешность вставки.
 */
export async function insert_many(docs : Document[]) {
    await connect_to_db(); // Подключиться к базе данных.
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.insertMany(docs); // Создать документы в БД.
    await close_connection(); // Закрыть сооединение к базе данных.
    return result; // Вернуть результат вставки.
}

/**
 * Обновить первый попавшийся документ в коллекции, удовлетворяющий заданному фильтру.
 * @param filter фильтр для поиска обновляемого документа.
 * @param updated_doc изменяемые поля документа.
 * @returns успешность изменения.
 */
export async function update_one(filter : Document, updated_doc : Document) {
    await connect_to_db(); // Подключиться к базе данных.
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.updateOne(filter, {$set: updated_doc}); // Изменить документ в БД.
    await close_connection(); // Закрыть сооединение к базе данных.
    return result; // Вернуть результат изменения.
}
