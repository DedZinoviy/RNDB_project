import Router, { Request, Response } from 'express';
import { Document } from 'mongodb';
import { get_games_by } from '../db/db';

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
        
        // Получить игры с максимальной текущей ценой из запроса.
        if (req.query.max_cur_price != undefined) { doc.push({$match: {'current_price': {$lte: Number(req.query.max_cur_price)}}}); }
        
        // Получить игры с минимальной текущей игрой из запроса.
        if (req.query.min_cur_price != undefined) { doc.push({$match: {'current_price': {$gte: Number(req.query.min_cur_price)}}}); }
        
        // Получить игры с максимальным рейтингом IGDB из запроса.
        if (req.query.max_igdb_score != undefined) { doc.push({$match: {'igdb_score': {$lte: Number(req.query.max_igdb_score)}}}); }
        
        // Получить игры с минимальным рейтингом IGDB из запроса.
        if (req.query.min_igdb_score != undefined) { doc.push({$match: {'igdb_score': {$gte: Number(req.query.min_igdb_score)}}}); }

        // Получить игры по подстроке названия игры.
        if (req.query.name_elem != undefined) { doc.push({$match: {'name': {$regex: req.query.name_elem, $options:"i"}}}); }

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

export default games_router; // Экспортировать роутер для других модулей.
