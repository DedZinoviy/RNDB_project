/** Тип, описывающий параметры фильтра. */
export type FilterParams = {
    
    /** Минимальная текушая цена. */
    minCurPrice: number,

    /** Максимальная текущая цена. */
    maxCurPrice: number,

    /** Порядок сортировки. */
    order: string,

    /** Имя игры или его часть. */
    name: string
};