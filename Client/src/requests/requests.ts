import { FilterParams } from "../types/FilterParams";

/** Адрес сервера. */
const host = "localhost:5000"

/** Получить все фильмы от сервера 
 * @returns ответ от сервера.
*/
export async function get_all_films() {
    const response = await fetch(host + '/games', {method: 'GET'}); // Отправить запрос на сервер.
    return response;
}

/**
 * Получить фильмы от сервера с учетом параметров запроса.
 * @param params параметры запроса, полученные из фильтров.
 * @returns ответ от сервера.
 */
export async function get_films_by(params: FilterParams) {
    const checked_params: { [key: string]: string } = {};
    // Добавить минимальную текущую цену, если таковая определена.
    if (params.minCurPrice !== undefined && !Number.isNaN(params.minCurPrice)) {checked_params.min_cur_price = params.minCurPrice.toString();}
    // Добавить максимальную текущую цену, если таковая определена.
    if (params.maxCurPrice !== undefined && !Number.isNaN(params.maxCurPrice)) {checked_params.max_cur_price = params.maxCurPrice.toString();}
    const response = await fetch(host + '/games?' + new URLSearchParams(checked_params).toString(), {method: 'GET'}); // Отправить запрос на сервер.
    return response;
}
