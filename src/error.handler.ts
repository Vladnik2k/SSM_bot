import {Messages} from './messages';

export class ErrorHandler {
    public static standard(chatId: number) {
        Messages.writeText(chatId, 'Виникла проблемка, наші друїди вже вирішують її.');
    }
}
