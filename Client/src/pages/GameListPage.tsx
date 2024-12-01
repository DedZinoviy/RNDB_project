import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import GameItemList from "../components/game_item_list/game_item_list";
import Filter from "../components/filter/filter";
import './GameListPage.css';

export default function GameListPage() {
    return (
        <>
            <Header></Header>
            <div className="content">
                <Filter></Filter>
                <GameItemList></GameItemList>
            </div>
            <Footer></Footer>
        </>
    );
}
