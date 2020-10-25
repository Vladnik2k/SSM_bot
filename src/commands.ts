import {TelegrafContext} from 'telegraf/typings/context';
import {Queries} from './queries';
import {ErrorHandler} from './error.handler';
import {UserModel} from './models';
import {Messages} from './messages';

export class Commands {
    public start(telegrafContext: TelegrafContext): void {
        const telegramId = <number>telegrafContext.from?.id;

        Queries.findUser(telegramId, (error: any, results: Array<UserModel>) => {
            if (error) ErrorHandler.standard(telegramId);

            results.length ? Commands.meetAgain(telegramId) : Commands.createNewUser(telegramId);
        });
    }

    public static meetAgain(chatId: number): void {
        Messages.writeText(chatId, 'Hello again');
    }

    private static createNewUser(telegramId: number): void {
        Queries.createUser(telegramId, (err: any) => {
            if (err) ErrorHandler.standard(telegramId);
        });
        Messages.writeText(telegramId, 'Hello at first time');
    }
}
