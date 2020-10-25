import {TelegrafContext} from 'telegraf/typings/context';
import {Queries} from './queries';
import {ErrorHandler} from './error.handler';
import {MusicModel, UserModel} from './models';
import {Service} from './service';

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
}
