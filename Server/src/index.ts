import express from 'express';
import { SERVER_PORT } from './env/env-vars';
import games_router from './routes/games_routes';
import cors from 'cors';

// Экземпляр серверного приложения.
export const app = express();

// Разрешить доступ с клиента.
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
    allowedHeaders: ['Content-Type'], // Разрешенные заголовки
}));

// Обработка запросов с любым путем.
app.options("*", cors());

// Настройка обработки (парсинга) JSON.
app.use(express.json());

// Обработка маршрута для работы с играми.
app.use('/games', games_router);

// Настройка сервера на прослушивание порта.
const port = SERVER_PORT || 3000;
app.listen( port, () => {
    console.log('Server running on port:' + port);
});

