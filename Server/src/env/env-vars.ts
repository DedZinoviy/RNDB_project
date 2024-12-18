import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { join } from 'path';

const enviroment = dotenv.config({path: join('.env')}); // Сконфигурировать окружение.

dotenvExpand.expand(enviroment); // Расширить переменные среды, применив интерполяцию там, где она необходимо.

export const { DATABASE_URL } = process.env; // Получить переменную DATABASE_URL.

export const { SERVER_PORT } = process.env; // Получить переменную SERVER_PORT (порт, на котором будет работать сервер).
