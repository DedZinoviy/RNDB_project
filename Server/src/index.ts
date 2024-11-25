import express, {Request, Response} from 'express';

// Экземпляр серверного приложения.
export const app = express();

// Настройка обработки (парсинга) JSON.
app.use(express.json());

// Обработка маршрута.
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Настройка сервера на прослушивание порта.
const port = 3000;
app.listen( port, () => {
    console.log('Server running on port:' + port);
});

