import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import GameItemList from "../components/game_item_list/game_item_list";
import Filter from "../components/filter/filter";
import { get_all_games } from "../requests/requests";
import { Game, json_to_game } from "../types/game";
import { useState, useEffect } from "react";
import './GameListPage.css';

/** Компонент страницы списка игр. */
export default function GameListPage() {
    const [games, setGames] = useState<Game[]>([]) // Массив игр в виде переменной состояния.
    useEffect(() => {
        get_all_games().then( // Получить все игры, затем обработать ответ от сервера,..
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
    }, []);
    // Отрисовать компонент страницы списка игр.
    return (
        <>
            <Header></Header>
            <div className="content">
                <Filter setGames={setGames}></Filter>
                <GameItemList games={games}/>
            </div>
            <Footer></Footer>
        </>
    );
}
