import './filter.css';
import React, { useState, useEffect } from 'react';
import { FilterParams } from '../../types/FilterParams';
import { Game, json_to_game } from '../../types/game';
import { get_filters, get_games_by } from '../../requests/requests';
import { itemsPerPage } from '../../pages/GameListPage';

/**
 * Свойства компонента фильтра.
 */
interface FilterProps {

  /** Метод для записи игр. */
  setGames: (React.Dispatch<React.SetStateAction<Game[]>>);

  /** Метод для записи текущей страницы. */
  setCurrentPage: (React.Dispatch<React.SetStateAction<number>>);

  /** Метод для записи количества страниц. */
  setTotalPages: (React.Dispatch<React.SetStateAction<number>>);
}

/**
 * Компонент фильтра игр.
 * @param FilterProps.setGames метод для записи списка игр.
 * @returns компонент отображения фильтра игр.
 */
export default function Filter({ setGames, setCurrentPage, setTotalPages }: FilterProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(Number(e.target.value));
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(Number(e.target.value));

  const [totalMinPrice, setTotalMinPrice] = useState(0);
  const [totalMaxPrice, setTotalMaxPrice] = useState(0);

  const [totalMinIGDB, setTotalMinIGDB] = useState(0);
  const [totalMaxIGDB, setTotalMaxIGDB] = useState(0);


  const [minIGDBScore, setMinIGDBScore] = useState(0);
  const [maxIGDBScore, setMaxIGDBScore] = useState(100);
  const handleMinIGDBScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => setMinIGDBScore(Number(e.target.value));
  const handleMaxIGDBScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxIGDBScore(Number(e.target.value));

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // По умолчанию сортировка по возрастанию.
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'igdb_score'>('name'); // По умолчанию сортировка по имени.
  const [searchQuery, setSearchQuery] = useState('');

  const [genres, setGenres] = useState<string[]>([]);
  
  useEffect(()=>{
    get_filters().then(
        (response) => {
            if (response.ok) return response.json(); // Вернуть массив JSON ответа, если запрос успешен.
            throw new Error("Failed to fetch filters"); // Иначе сообщить о проблеме.
        } 
    ).then(
        (json) => {
            if (json.length > 0) { // Обработать json, если запрос успешен.
                console.log(json);
                setGenres(json[0].uniqueGenres);
                setTotalMinPrice(json[0].min_cur_price);
                setMinPrice(json[0].min_cur_price);
                setMaxPrice(json[0].max_cur_price);
                setTotalMaxPrice(json[0].max_cur_price);
                setMinIGDBScore(json[0].min_igdb_score);
                setTotalMinIGDB(json[0].min_igdb_score);
                setMaxIGDBScore(json[0].max_igdb_score);
                setTotalMaxIGDB(json[0].max_igdb_score);
            }
        }
    )
},[]);

  console.log(genres);

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(e.target.value as 'name' | 'price' | 'igdb_score');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // Новое состояние для выбранных жанров

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genre = e.target.value;
    setSelectedGenres(prevState =>
      prevState.includes(genre)
        ? prevState.filter(g => g !== genre) // Убираем жанр, если он уже выбран
        : [...prevState, genre] // Добавляем жанр
    );
  };

  return (
    <form className="filter" onSubmit={handleSubmit}>
      <h2>Фильтрация</h2>
      <div className="filter-content">
        {/* Поля фильтрации */}
        <label htmlFor="search">Поиск по названию:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Введите название игры или его часть"
        />
        <label htmlFor="min-price">Минимальная цена:</label>
        <input
          type="number"
          id="min-price"
          name="min-price"
          min={totalMinPrice}
          max={totalMaxPrice}
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <label htmlFor="max-price">Максимальная цена:</label>
        <input
          type="number"
          id="max-price"
          name="max-price"
          min={totalMinPrice}
          max={totalMaxPrice}
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        <p>
          Цена: <span id="price-range">{minPrice}₽ - {maxPrice}₽</span>
        </p>
        <label htmlFor="min-igdb">Минимальный Рейтинг IGDB:</label>
        <input
          type="number"
          id="min-igdb"
          name="min-igdb"
          min={totalMinIGDB}
          max={totalMaxIGDB}
          value={minIGDBScore}
          onChange={handleMinIGDBScoreChange}
        />
        <label htmlFor="max-igdb">Максимальный Рейтинг IGDB:</label>
        <input
          type="number"
          id="max-igdb"
          name="max-igdb"
          min={totalMinIGDB}
          max={totalMaxIGDB}
          value={maxIGDBScore}
          onChange={handleMaxIGDBScoreChange}
        />
        <p>
          Рейтинг IGDB: <span id="igdb-range">{minIGDBScore} - {maxIGDBScore}</span>
        </p>

        {/* Список жанров (Checkbox) */}
        <div className="genres">
          <label>Жанры:</label>
          {genres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleGenreChange}
              />
              {genre}
            </label>
          ))}
        </div>

        <div className="sort-by">
          <label>Сортировать по:</label>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="name"
              checked={sortBy === 'name'}
              onChange={handleSortByChange}
            />
            По названию
          </label>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="price"
              checked={sortBy === 'price'}
              onChange={handleSortByChange}
            />
            По цене
          </label>
          <label>
            <input
              type="radio"
              name="sortBy"
              value="igdb_score"
              checked={sortBy === 'igdb_score'}
              onChange={handleSortByChange}
            />
            По рейтингу IGDB
          </label>
        </div>
        <div className="sort-order">
          <label>Порядок сортировки:</label>
          <label>
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={sortOrder === 'asc'}
              onChange={handleSortOrderChange}
            />
            По возрастанию
          </label>
          <label>
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={sortOrder === 'desc'}
              onChange={handleSortOrderChange}
            />
            По убыванию
          </label>
        </div>
      </div>
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
    const minIGDB = parseInt(formData.get('min-igdb') as string);
    const maxIGDB = parseInt(formData.get('max-igdb') as string);
    const sorting_order = formData.get('sortOrder') as string;
    const sort_by = formData.get('sortBy') as string;
    const search = formData.get('search') as string;
    const FilterData: FilterParams = {
      minCurPrice: minCurPrice, maxCurPrice: maxCurPrice, order: sorting_order, sort_by: sort_by, name: search,
      minIGDBScore: minIGDB, maxIGDBScore: maxIGDB, genres: selectedGenres
    };

    get_games_by(FilterData).then( // Получить игры по фильтру, затем обработать ответ от сервера,..
      (response) => {
        if (response.ok) return response.json(); // Вернуть массив JSON ответа, если запрос успешен.
        throw new Error("Failed to fetch games"); // Иначе сообщить о проблеме.
      }
    ).then( //... затем обработать JSON массив.
      (json) => {
        if (json.length > 0) { // Получить преобразованный в нужный тип массив игр, если таковые получены.
          const g = json_to_game(json);
          setCurrentPage(1);
          setTotalPages(Math.ceil(g.length / itemsPerPage));
          setGames(g);
        }
        else {
          const g: Game[] = [];
          setCurrentPage(1);
          setTotalPages(1);
          setGames(g);
        }
      }
    )
  }
}
