import {bot} from './app';
import {MusicModel} from './models';
import {Extra, Markup} from 'telegraf';
import {InlineKeyboardButton} from 'telegraf/typings/markup';

export class Messages {
    public static writeText(chatId: number, text: string): void {
        bot.telegram.sendMessage(chatId, text);
    }

    public static writeAudio(chatId: number, fileId: string): void {
        bot.telegram.sendAudio(chatId, fileId);
    }

    public static writeAdded(chatId: number, musicResults: Array<MusicModel>): void {
        if (!musicResults.length) {
            Messages.writeText(chatId, 'Ви ще не додали треків😢');
            return;
        }

        const buttons: Array<InlineKeyboardButton> = [];
        let text = '';
        musicResults.sort(((a, b) => a.added_at < b.added_at ? 1 : -1)).forEach((music, index) => {
            text += `${index + 1} - ${music.title}\n`;
            buttons.push(Markup.callbackButton(`${index + 1}`, `show-song.${music.id}`));
        });
        const newButtons: Array<any> = [];
        for (let i = 0; i < buttons.length; i += 5) {
            newButtons.push(buttons.slice(i, i + 5));
        }

        bot.telegram.sendMessage(chatId, text, Extra.markup(Markup.inlineKeyboard(newButtons)));
    }
}
