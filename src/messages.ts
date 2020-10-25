import {bot} from './app';

export class Messages {
    public static writeText(chatId: number, text: string): void {
        bot.telegram.sendMessage(chatId, text);
    }

    public static writeAudio(chatId: number, fileId: string): void {
        bot.telegram.sendAudio(chatId, fileId);
    }
}
