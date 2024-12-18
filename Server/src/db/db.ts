import { MongoClient, Document } from "mongodb";
import { DATABASE_URL } from "../env/env-vars"

const url = DATABASE_URL!; // Строка подключения к MongoDB.

if (!DATABASE_URL) { // Сообщить, если не удалось получить ссылку на базу данных.
    throw new Error("DATABASE_URL is not set");
}

const client = new MongoClient(url); // Клиент подключения к MongoDB.
connect_to_db();
/**
 * Попытаться подключиться к базе данных.
 */
async function connect_to_db() {
    try {
        await client.connect();
        const now = new Date(); // Получить дату подключения.
        console.log(now.toISOString() + ': Connected to MongoDB.');
    } catch (error) {
        console.error('Error connect to MongoDB.', error);
    }
}

/**
 * Закрыть соединение к базе данных.
 */
async function close_connection() {
    await client.close();
    const now = new Date();
    console.log(now.toISOString() + ': Connection closed.'); // Сообщить о закрытии соединения.
}

/**
 * Получить все игры из базы данных.
 * @returns массив документов игр.
 */
export async function get_all_games() {
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const cursor = collection.find(); // Получить все записи из коллекции.
    const games =  await cursor.toArray();
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

    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.

    const cursor = collection.aggregate(pipline); // Получить записи из коллекции согласно пайплайну.
    const games =  await cursor.toArray(); 

    return games; // Вернуть массив с записями игр.
}

/**
 * Вставить один документ в БД.
 * @param doc документ, который будет вставлен в БД.
 * @returns успешность вставки.
 */
export async function insert_one(doc : Document) {
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.insertOne(doc); // Создать документ в БД.
    return result; // Вернуть результат вставки.
}

/**
 * Вставить несклько документов в БД.
 * @param doc документы, которые будут вставлены в БД.
 * @returns успешность вставки.
 */
export async function insert_many(docs : Document[]) {
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.insertMany(docs); // Создать документы в БД.
    return result; // Вернуть результат вставки.
}

/**
 * Обновить первый попавшийся документ в коллекции, удовлетворяющий заданному фильтру.
 * @param filter фильтр для поиска обновляемого документа.
 * @param updated_doc изменяемые поля документа.
 * @returns успешность изменения.
 */
export async function update_one(filter : Document, updated_doc : Document) {
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.updateOne(filter, {$set: updated_doc}); // Изменить документ в БД.
    return result; // Вернуть результат изменения.
}

/**
 * Обновить все документы в коллекции, удовлетворяющие заданному фильтру.
 * @param filter фильтр для поиска обновляемых документов.
 * @param updated_doc изменяемые поля документов.
 * @returns успешность изменения.
 */
export async function update_many(filter : Document, updated_doc : Document) {
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.updateMany(filter, {$set: updated_doc}); // Изменить документы в БД.
    return result; // Вернуть результат изменения.
}

/**
 * Удалить первый попавшийся документ в коллекции, удовлетворяющий заданному фильтру.
 * @param filter фильтр для поиска удаляемого документа.
 * @returns Успешность удаления.
 */
export async function delete_one(filter: Document) {
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.deleteOne(filter); // Удалить документ в БД.
    return result; // Вернуть результат изменения.
}

/**
 * Удалить все документы в коллекции, удовлетворяющие заданному фильтру.
 * @param filter фильтр для поиска удаляемых документов.
 * @returns Успешность удаления.
 */
export async function delete_many(filter: Document) {
    const collection = client.db('steamdb').collection('steamdb'); // Выбрать требуемую коллекцию.
    const result = await collection.deleteOne(filter); // Удалить документы в БД.
    return result; // Вернуть результат удаления.    
}
