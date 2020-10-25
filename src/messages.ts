import {bot} from './app';

export class Messages {
    public static writeText(chatId: number, text: string): void {
        bot.telegram.sendMessage(chatId, text);
    }
}
