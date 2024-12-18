import React from "react";
import GameItem from "../game_item/game_item";
import './game_item_list.css';
import { Game } from "../../types/game";

/** Тип свойств компонента списка игр. */
interface GameItemListProp {
  games: Game[];
}

/** 
 * Компонент списка игр.
 * @param games список игр в виде массива.
 * @returns Компонент отображения списка игр.
*/
const GameItemList: React.FC<GameItemListProp> = ({ games }: GameItemListProp) => {
  console.log(games)
  return (
    <section className="games-list">
      {games.length !== 0 ?  games.map((game) => (
        <GameItem game={game} key={game.sid} />
      )) : <p>Ничего не найдено.</p>}
    </section>
  );
};

export default GameItemList;
