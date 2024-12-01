import React from "react";
import GameItem from "../game_item/game_item";
import './game_item_list.css';
import { Game } from "../../types/game";

const GameItemList: React.FC = () => {
  const games: Game[] = [
    { name: "Игра 1", description: "Краткое описание игры 1.", current_price: 3500, image: "https://via.placeholder.com/100x140?text=Игра+1", sid:1, store_url:'abc',genres:'', igdb_score:0, published:'', developers:'', publishers:"" },
  ];

  return (
    <section className="games-list">
      {games.map((game) => (
        <GameItem game={game}/>
      ))}
    </section>
  );
};

export default GameItemList;
