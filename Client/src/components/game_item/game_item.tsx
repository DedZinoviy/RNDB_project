import { Game } from "../../types/game";
import './game_item.css'

interface GameItemProp {
    game: Game;
}

export default function GameItem({game}: GameItemProp) {
    const labelId = `list-label-${game.sid}`;
    return (
        <div className="game-item" id={labelId}>
            <div className="game-info">
                <h3>{game.name}</h3>
                <p className="description">{game.description}</p>
                <p className="price">Цена: {game.current_price}₽</p>
                <p className="igdb-score">Рейтинг IGDB: {game.igdb_score}</p>
                <p className="genres-list">Жанры: {game.genres}</p>
            </div>
        </div>
    );
}
