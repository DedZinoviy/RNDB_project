import { FilterParams } from "../types/FilterParams";

/** Адрес сервера. */
const host = "localhost:5000"

/** Получить все игры от сервера 
 * @returns ответ от сервера.
*/
export async function get_all_games() {
    const response = await fetch('http://'+ host + '/games', {method: 'GET'}); // Отправить запрос на сервер.
    return response;
}

/**
 * Получить игры от сервера с учетом параметров запроса.
 * @param params параметры запроса, полученные из фильтров.
 * @returns ответ от сервера.
 */
export async function get_games_by(params: FilterParams) {
    const checked_params: { [key: string]: string } = {};
    // Добавить минимальную текущую цену, если таковая определена.
    if (params.minCurPrice !== undefined && !Number.isNaN(params.minCurPrice)) {checked_params.min_cur_price = params.minCurPrice.toString();}
    // Добавить максимальную текущую цену, если таковая определена.
    if (params.maxCurPrice !== undefined && !Number.isNaN(params.maxCurPrice)) {checked_params.max_cur_price = params.maxCurPrice.toString();}
    // Добавить минимальный рейтинг IGDB, если таковой определен.
    if (params.minIGDBScore !== undefined && !Number.isNaN(params.minIGDBScore)) {checked_params.min_igdb_score = params.minIGDBScore.toString();}
    // Добавить максимальный рейтинг IGDB, если таковой определен.
    if (params.maxIGDBScore !== undefined && !Number.isNaN(params.maxIGDBScore)) {checked_params.max_igdb_score = params.maxIGDBScore.toString();}
    // Добавить порядок сортировки, если таковой определен.
    if (params.order !== undefined) {checked_params.order = (params.order === 'desc' ? -1 : 1).toString();}
    // Добавить имя игры или его часть для поиска, если таковая определена.
    if (params.name !== undefined) {checked_params.name_elem = params.name; }
    // Добавить поле, по которому проводить сортировку, если такое указано.
    if (params.sort_by !== undefined) {
        if (params.sort_by === 'price') {checked_params.sort_by = 'current_price';} // Если определена сортировка по текущей цене, добавить текущую цену.
        else if (params.sort_by === 'name') {checked_params.sort_by = 'name';} // ИначеЕсли определена сортировка по имени, добавить имя.
    }
    const response = await fetch('http://' + host + '/games?' + new URLSearchParams(checked_params).toString(), {method: 'GET'}); // Отправить запрос на сервер.
    return response;
}
