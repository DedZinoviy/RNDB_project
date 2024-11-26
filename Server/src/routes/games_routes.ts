import Router, { Request, Response } from 'express';
import { Document } from 'mongodb';
import { get_all_games, get_games_by } from '../db/db';

const games_router = Router(); // Экземляр роутера для запросов о играх.

/**
 * Обработка маршрута получения игр.
 */
games_router.get(
    '/', async (req: Request, res: Response) => {
        // Массив результатов запроса к БД.
        let result_array: Document[];

        // Запрос к БД.
        let doc: Document[] = [];
        
        // Получить все игры, если запрос пустой.
        if (Object.keys(req.query).length === 0) { result_array = await get_all_games(); }
        
        // Получить игры с максимальной текущей ценой из запроса.
        if (req.query.max_cur_price != undefined) { doc.push({$match: {'current_price': {$lte: Number(req.query.max_cur_price)}}}); }
        
        // Получить игры с минимальной текущей игрой из запроса.
        if (req.query.min_cur_price != undefined) { doc.push({$match: {'current_price': {$gte: Number(req.query.min_cur_price)}}}); }
        
        result_array = await get_games_by(doc); // Получение игр из БД по запросу.
        res.send(result_array); // Ответ на запрос.
    }
);

export default games_router; // Экспортировать роутер для других модулей.
