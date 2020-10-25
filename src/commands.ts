import {TelegrafContext} from 'telegraf/typings/context';
import {Queries} from './queries';
import {ErrorHandler} from './error.handler';
import {UserModel} from './models';
import {Service} from './service';
import {Messages} from './messages';

export class Commands {
    public start(telegrafContext: TelegrafContext): void {
        const chatId = <number>telegrafContext.chat?.id;

        Queries.findUser(chatId, (error: any, results: Array<UserModel>) => {
            if (error) ErrorHandler.standard(chatId);

            results.length ? Service.meetAgain(chatId) : Service.createNewUser(chatId);
        });
    }

    public uploadMusic(telegrafContent: TelegrafContext) {
        const chatId = telegrafContent.chat?.id;

        const audio = telegrafContent.update?.message?.audio;
        const duration = audio?.duration;
        const name = audio?.title;
        const performer = audio?.performer;
        const fileId = audio?.file_id;

        Messages.writeAudio(<number>chatId, <string>fileId);
    }
}
