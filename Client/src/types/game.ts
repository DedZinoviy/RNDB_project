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