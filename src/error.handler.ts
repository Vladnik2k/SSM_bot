import {Messages} from './messages';

export class ErrorHandler {
    public static standard(chatId: number) {
        Messages.writeText(chatId, 'Что-то случилось, мы уже решаем проблему');
    }
}
