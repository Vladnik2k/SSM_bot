import {TelegrafContext} from 'telegraf/typings/context';
import {Queries} from './queries';
import {ErrorHandler} from './error.handler';
import {MusicModel, UserModel} from './models';
import {Service} from './service';
import {Messages} from './messages';

export class Commands {
    public start(telegrafContext: TelegrafContext): void {
        const chatId = Service.getChatId(telegrafContext);

        Queries.findUser(chatId, (error: any, results: Array<UserModel>) => {
            if (error) ErrorHandler.standard(chatId);

            results.length ? Service.meetAgain(chatId) : Service.createNewUser(chatId);
        });
    }

    public uploadMusic(telegrafContext: TelegrafContext) {
        const chatId = Service.getChatId(telegrafContext);
        // @ts-ignore
        const fileUniqueId = telegrafContext.message?.audio?.file_unique_id;

        Queries.findMusicByFileId(fileUniqueId, (findMusicError: any, musicResults: Array<MusicModel>) => {
            if (findMusicError) ErrorHandler.standard(chatId);

            if (musicResults.length) { Service.uploadMusicAgain(chatId); return; }

            Queries.findUser(chatId, (findUserError: any, userResults: Array<UserModel>) => {
                if (findUserError) ErrorHandler.standard(chatId);

                Service.createNewAudio(telegrafContext, userResults[0].id);
            });
        });
    }

    public searchMusic(telegrafContext: TelegrafContext) {
        const chatId = Service.getChatId(telegrafContext);
        const title = <string>telegrafContext.message?.text;

        Queries.findMusicByTitle(title, (findMusicError: any, musicResults: Array<MusicModel>) => {
            if (findMusicError) ErrorHandler.standard(chatId);

            Messages.writeAdded(chatId, musicResults);
        });
    }

    public seeAdded(telegrafContext: TelegrafContext): void {
        const chatId = Service.getChatId(telegrafContext);

        Queries.findUser(chatId, (findUserError: any, userResults: Array<UserModel>) => {
            if (findUserError) ErrorHandler.standard(chatId);

            Queries.findMusicByUserId(userResults[0].id, (findMusicError: any, musicResults: Array<MusicModel>) => {
                if (findMusicError) ErrorHandler.standard(chatId);

                Messages.writeAdded(chatId, musicResults);
            });
        });
    }

    public seeSong(telegrafContext: TelegrafContext): void {
        const musicId = +<string>telegrafContext.match?.input?.split('show-song.')[1];
        const chatId = Service.getChatId(telegrafContext);

        Queries.findMusicId(musicId, (findMusicError: any, musicResults: Array<MusicModel>) => {
            if (findMusicError) ErrorHandler.standard(chatId);

            Messages.writeAudio(chatId, musicResults[0].file_id);
        });
    }
}
