import express, {Request, Response} from 'express';
import { SERVER_PORT } from './env/env-vars';

// Экземпляр серверного приложения.
export const app = express();

// Настройка обработки (парсинга) JSON.
app.use(express.json());

// Обработка маршрута.
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Настройка сервера на прослушивание порта.
const port = SERVER_PORT || 3000;
app.listen( port, () => {
    console.log('Server running on port:' + port);
});

