import {connection} from './app';

export class Queries {
    public static findUser(telegramId: number, callback: any): any {
        return connection.query(`SELECT * FROM user WHERE telegram_id=${telegramId}`, callback);
    }

    public static createUser(telegramId: number, callback: any): any {
        return connection.query(`INSERT INTO user (telegram_id) VALUES (${telegramId})`, callback);
    }
}
