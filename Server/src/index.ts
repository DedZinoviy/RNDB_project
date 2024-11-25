import { get_all_games } from "./db/db";

async function main() {
    const games = await get_all_games();

    for (let i = 0; i < 3; i++) {
        console.log(games[i]);
    }
}

main();
