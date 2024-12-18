import Router, { Request, Response } from 'express';
import { Document } from 'mongodb';
import { get_games_by } from '../db/db';

const games_router = Router(); // Экземляр роутера для запросов о играх.

/** Поля, которые требуются для получения из БД. */
const filter = {$project: {
    sid: true,
    store_url: true,
    published_store: true,
    "name": true,
    "image": true,
    description: true,
    current_price: { $ifNull: ["$current_price", 0] },
    developers: true,
    publishers: true,
    genres: true,
    igdb_score:  { $ifNull: ["$igdb_score", 0] }
}};

/**
 * Обработка маршрута получения игр.
 */
games_router.get(
    '/', async (req: Request, res: Response) => {
        // Массив результатов запроса к БД.
        let result_array: Document[];

        // Запрос к БД.
        let doc: Document[] = [];
        
        // Обрабатывать только требуемые поля.
        doc.push(filter);
        
        // Получить игры с максимальной текущей ценой из запроса.
        if (req.query.max_cur_price != undefined) { doc.push({$match: {$or: [{'current_price': {$lte: Number(req.query.max_cur_price)}}, {'current_price': null}]}}); }
        
        // Получить игры с минимальной текущей игрой из запроса.
        if (req.query.min_cur_price != undefined) { 
            if (Number(req.query.min_cur_price) === 0) {doc.push({$match: {$or: [{'current_price': {$gte: 0}}, {'current_price': null}]}})}
            else doc.push({$match: {'current_price': {$gte: Number(req.query.min_cur_price)}}}); }
        
        // Получить игры с максимальным рейтингом IGDB из запроса.
        if (req.query.max_igdb_score != undefined) { doc.push({$match: {$or: [{'igdb_score': {$lte: Number(req.query.max_igdb_score)}}, {'igdb_score': null}]}}); }
        
        // Получить игры с минимальным рейтингом IGDB из запроса.
        if (req.query.min_igdb_score != undefined) { 
            if (Number(req.query.min_igdb_score) === 0) {doc.push({$match: {$or: [{'igdb_score': {$gte: 0}}, {'igdb_score': null}]}})}
            else doc.push({$match: {'igdb_score': {$gte: Number(req.query.min_igdb_score)}}}); 
        }

        // Получить игры по подстроке названия игры.
        if (req.query.name_elem != undefined) { doc.push({$match: {'name': {$regex: req.query.name_elem, $options:"i"}}}); }

        // Получить игры по жанарам.
        if (req.query.genres != undefined) {
            const genres = (req.query.genres as string).split(',') ;
            for (const genre of genres) {
                doc.push({$match: {'genres': {$regex: genre, $options:"i"}}});
            }
        }

        // Определить порядок сортировки.
        let order = 1; // Отсортировать по умолчанию по возрастанию.
        if (req.query.order != undefined) { order = Number(req.query.order); }

        // Определить поле для сортировки.
        let sort_by = 'name';
        if (req.query.sort_by != undefined) {sort_by = req.query.sort_by as string; }

        doc.push({$sort: {[sort_by]: order}}); // Осортировать игры по названию.
        result_array = await get_games_by(doc); // Получение игр из БД по запросу.
        res.send(result_array); // Ответ на запрос.
    }
);

/**
 * Обработка маршрута добавления игр.
 */
games_router.post(
    '/', async (req: Request, res: Response) => {

    }
);

/**
 * Обработка маршрута изменения записи об играх.
 */
games_router.patch(
    '/:id', async (req: Request, res: Response) => {

    }
);

/**
 * Обработка маршрута удаления игр.
 */
games_router.delete(
    '/:id', async (req: Request, res: Response) => {
        
    }
);

/**
 * Обработка получения значений фильтра.
 */
games_router.get('/filters', async (req: Request, res: Response) => {
    // Массив результатов запроса к БД.
    let result_array: Document[];

    // Запрос к БД.
    let doc: Document[] = [];
    
    // Обрабатывать только требуемые поля.
    doc.push({
        $project: {
          sid: true,
          store_url: true,
          published_store: true,
          "name": true,
          "image": true,
          description: true,
          current_price: { $ifNull: ["$current_price", 0] }, // Замена null на 0 для current_price
          developers: true,
          publishers: true,
          genres: { 
            $split: ["$genres", ","] // Разбитие строки жанров на массив
          },
          igdb_score: { $ifNull: ["$igdb_score", 0] } // Замена null на 0 для igdb_score
        }
      });
    
    // Получить значения для фильтров при помощи группировки.
    const group = {
        $group: {
            _id: null, 
            min_cur_price: { $min: "$current_price" }, // Минимальное значение для current_price
            max_cur_price: { $max: "$current_price" }, // Максимальное значение для current_price
            min_igdb_score: { $min: "$igdb_score" }, // Минимальное значение для igdb_score
            max_igdb_score: { $max: "$igdb_score" }, // Максимальное значение для igdb_score
            uniqueGenres: { $addToSet: { $arrayElemAt: ["$genres", 0] } } // Убирать дубликаты жанров
          }
    };

    doc.push(group);
    result_array = await get_games_by(doc); // Обработка запроса к БД.
    res.send(result_array); // Ответ на запрос.
});

export default games_router; // Экспортировать роутер для других модулей.
