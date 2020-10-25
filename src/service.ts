import {Messages} from './messages';
import {Queries} from './queries';
import {ErrorHandler} from './error.handler';

export class Service {
    public static meetAgain(chatId: number): void {
        Messages.writeText(chatId, 'І знову привіт!)');
    }

    public static createNewUser(telegramId: number): void {
        Queries.createUser(telegramId, (err: any) => {
            if (err) ErrorHandler.standard(telegramId);
        });
        Messages.writeText(telegramId, 'Здається, ти тут вперше)');
    }
}
