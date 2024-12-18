import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import GameItemList from "../components/game_item_list/game_item_list";
import Filter from "../components/filter/filter";
import { get_all_games } from "../requests/requests";
import { Game, json_to_game, get_unique_genres } from "../types/game";
import { useState, useEffect } from "react";
import './GameListPage.css';
import PaginationWidget from "../components/pagination/pagination";

export const itemsPerPage = 15; // Количество элементов (игр) на странице.


/** Компонент страницы списка игр. */
export default function GameListPage() {
    const [games, setGames] = useState<Game[]>([]); // Массив игр в виде переменной состояния.
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница.
    const [totalPages, setTotalPages] = useState(100); // Максимальное количество страниц.
    const [genres, setGenres] = useState<string[]>([]);
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
                    setGenres(get_unique_genres(g));
                    setTotalPages(Math.ceil(g.length / itemsPerPage)); // Установить количество страниц в пагинации.
                }
            }
        )
    }, []);

    /** Обработчик смены станицы. */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Отрисовать компонент страницы списка игр.
    return (
        <>
            <Header></Header>
            <div className="content">
                <Filter setGames={setGames}
                setCurrentPage={setCurrentPage}
                setTotalPages={setTotalPages}
                genres={genres}></Filter>
                <GameItemList games={games.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage)}/>
            </div>
            <PaginationWidget 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            />
            <Footer></Footer>
        </>
    );
}
