import './filter.css';
import React, { useState } from 'react';

export default function Filter() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(Number(e.target.value));
    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(Number(e.target.value));

    return (
        <section className="filter">
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
        </section>
    );
}
