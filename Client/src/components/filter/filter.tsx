import './filter.css';
import React, { useState } from 'react';
import { FilterParams } from '../../types/FilterParams';
import { Game, json_to_game } from '../../types/game';
import { get_games_by } from '../../requests/requests';

/**
 * Свойства компонента фильтра.
 */
interface FilterProps {
  
  /** Метод для записи игр. */
  setGames: (React.Dispatch<React.SetStateAction<Game[]>>)
}

/**
 * Компонент фильтра игр.
 * @param FilterProps.setGames метод для записи списка игр.
 * @returns компонент отображения фильтра игр.
 */
export default function Filter({setGames} : FilterProps) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(Number(e.target.value));
    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(Number(e.target.value));

    return (
        <form className="filter" onSubmit={handleSubmit}>
          <h2>Фильтрация по цене</h2>
          <label htmlFor="min-price">Минимальная цена:</label>
          <input
            type="number"
            id="min-price"
            name="min-price"
            min="0"
            max="10000"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <label htmlFor="max-price">Максимальная цена:</label>
          <input
            type="number"
            id="max-price"
            name="max-price"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <p>
            Цена: <span id="price-range">{minPrice}₽ - {maxPrice}₽</span>
          </p>
          <button type="submit">Применить фильтры</button>
        </form>
    );

    /**
     * Обработать сабмит формы фильтров.
     * @param e событие формы фильтров.
     */
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const minCurPrice = parseInt(formData.get('min-price') as string);
      const maxCurPrice = parseInt(formData.get('max-price') as string);
      const FilterData: FilterParams = {minCurPrice: minCurPrice, maxCurPrice: maxCurPrice};
      
      get_games_by(FilterData).then( // Получить игры по фильтру, затем обработать ответ от сервера,..
        (response) => {
            if (response.ok) return response.json(); // Вернуть массив JSON ответа, если запрос успешен.
            throw new Error("Failed to fetch games"); // Иначе сообщить о проблеме.
        }
      ).then( //... затем обработать JSON массив.
        (json) => {
            if (json.length > 0) { // Получить преобразованный в нужный тип массив игр, если таковые получены.
                const g = json_to_game(json);
                setGames(g);
            }
        }
      )
    }
}
