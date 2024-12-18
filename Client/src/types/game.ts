/**
 * Тип, отображающий игру Steam.
 */
export type Game = {

    /** Уникальный идентификатор. */
    sid: number;

    /** Ссылка на страницу игры в Steam. */
    store_url: string;

    /** Дата публикации игры в Steam. */
    published: string;

    /** Название игры в Steam. */
    name: string;

    /** Изображение игры в Steam. */
    image: string;

    /** Описание игры. */
    description: string;

    /** текущая цена на игру в Steam. */
    current_price: number;

    /** Список разработчиков. */
    developers: string;

    /** Список издателей. */
    publishers: string;

    /** Жанры игры. */
    genres: string;

    /** Рейтинг игры на IGDB. */
    igdb_score: number;
}

/**
 * Перевести результат запроса на сервер в массив игр с указанным типом.
 * @param json_array Массив, полученный от сервера.
 * @returns Массив игр.
 */
export function json_to_game(json_array: {[key: string]: string }[]): Game[] {
    const games: Game[] = []; // Считать, что изначальный массив игр пустой.
    for (const elem of json_array) { // Для каждой игры из ответа сервера...
        // Создать объект игры, эквивалентный записи на сервере.
        const game: Game = {sid: Number(elem.sid),
                            store_url: elem.store_url,
                            published: elem.published_store,
                            name: elem.name,
                            image: elem.image,
                            description: elem.description,
                            current_price: Number(elem.current_price),
                            developers: elem.developers,
                            publishers: elem.publishers,
                            genres: elem.genres,
                            igdb_score: Number(elem.igdb_score)
        };
        games.push(game); // Добавить игру в изначальный массив.
    }
    return games;
}

/**
 * Получить массив уникальных жанров игр.
 * @param games массив игр с жанрами.
 * @returns массив уникальных элементов, состоящий из жанров.
 */
export function get_unique_genres(games: Game[]) : string[] {
    const unique_genres: string[] = []; // Считать, что изначально массив жанров пуст.
    for (const game of games) { // Для каждой игры массива...
        const genres = game.genres.split(','); // Получить список жанров игры.
        for (const genre of genres) { // Для каждого жанра игры...
            if (!unique_genres.includes(genre)) { // Считать жанр уникальным, если он отсуствует в массиве уникальных жанров.
                unique_genres.push(genre); 
            }
        }
    }
    return unique_genres;
}
