import express from 'express';
import { SERVER_PORT } from './env/env-vars';
import games_router from './routes/games_routes';

// Экземпляр серверного приложения.
export const app = express();

// Настройка обработки (парсинга) JSON.
app.use(express.json());

// Обработка маршрута для работы с играми.
app.use('/games', games_router);

// Настройка сервера на прослушивание порта.
const port = SERVER_PORT || 3000;
app.listen( port, () => {
    console.log('Server running on port:' + port);
});

