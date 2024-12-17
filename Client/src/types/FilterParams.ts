/** Тип, описывающий параметры фильтра. */
export type FilterParams = {
    
    /** Минимальная текушая цена. */
    minCurPrice: number,

    /** Максимальная текущая цена. */
    maxCurPrice: number,

    /** Минимальный рейтинг IGDB. */
    minIGDBScore: number,

    /** Максимальный рейтинг IGDB. */
    maxIGDBScore: number,

    /** Порядок сортировки. */
    order: string,

    /** Поле, по которому проводить сортировку. */
    sort_by: string,

    /** Имя игры или его часть. */
    name: string
};