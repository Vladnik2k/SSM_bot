import {connection} from './app';
import {MusicModel} from './models';

export class Queries {
    public static findUser(chatId: number, callback: any): any {
        return connection.query(`SELECT * FROM user WHERE chat_id=${chatId}`, callback);
    }

    public static createUser(chatId: number, callback: any): any {
        return connection.query(`INSERT INTO user (chat_id) VALUES (${chatId})`, callback);
    }

    public static findMusicByFileId(fileUniqueId: string, callback: any): any {
        return connection.query(`SELECT * FROM music WHERE file_unique_id='${fileUniqueId}'`, callback);
    }

    public static createMusic(musicModel: MusicModel, callback: any): any {
        return connection.query(`INSERT INTO music (title, duration, added_by, file_id, file_unique_id, added_at) VALUES ('${musicModel.title}', ${musicModel.duration}, ${musicModel.added_by}, '${musicModel.file_id}', '${musicModel.file_unique_id}', NOW())`, callback);
    }
}
