import {Messages} from './messages';
import {Queries} from './queries';
import {ErrorHandler} from './error.handler';
import {TelegrafContext} from 'telegraf/typings/context';
import {MusicModel} from './models';

export class Service {
    public static meetAgain(chatId: number): void {
        Messages.writeText(chatId, 'І знову привіт!)');
    }

    public static createNewUser(chatId: number): void {
        Queries.createUser(chatId, (err: any) => {
            if (err) ErrorHandler.standard(chatId);
        });
        Messages.writeText(chatId, 'Здається, ти тут вперше)');
    }

    public static uploadMusicAgain(chatId: number) {
        Messages.writeText(chatId, 'Знайома мелодія');
    }

    public static createNewAudio(telegrafContext: TelegrafContext, userId: number) {
        const musicModel = Service.prepareAudioInfo(telegrafContext, userId);

        Queries.createMusic(musicModel, (err: any) => {
            if (err) {
                ErrorHandler.standard(Service.getChatId(telegrafContext));
            } else {
                Messages.writeText(Service.getChatId(telegrafContext), 'Нову мелодію додано успішно!');
            }
        });
    }

    public static getChatId(telegrafContext: TelegrafContext): number {
        return <number>telegrafContext.chat?.id;
    }

    private static prepareAudioInfo(telegrafContext: TelegrafContext, userId: number): MusicModel {
        const audio = telegrafContext.update?.message?.audio;
        return <MusicModel>{
            title: audio?.title,
            duration: audio?.duration,
            file_id: audio?.file_id,
            added_by: userId,
            // @ts-ignore
            file_unique_id: audio?.file_unique_id
        };
    }
}
