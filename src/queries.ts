import {connection} from './app';

export class Queries {
    public static findUser(chatId: number, callback: any): any {
        return connection.query(`SELECT * FROM user WHERE chat_id=${chatId}`, callback);
    }

    public static createUser(chatId: number, callback: any): any {
        return connection.query(`INSERT INTO user (chat_id) VALUES (${chatId})`, callback);
    }
}
