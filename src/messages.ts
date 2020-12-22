import {bot} from './app';
import {Extra, Markup} from 'telegraf';
import {InlineKeyboardButton} from 'telegraf/typings/markup';

export class Messages {
    public static writeText(chatId: number, text: string): void {
        bot.telegram.sendMessage(chatId, text);
    }

    public static writeAudio(chatId: number, fileId: string, musicId: string): void {
        const buttons: Array<InlineKeyboardButton> = [];
        buttons.push(Markup.callbackButton(`Подобається`, `like.${musicId}`));
        buttons.push(Markup.callbackButton(`Неподобається`, `dislike.${musicId}`));

        bot.telegram.sendAudio(chatId, fileId);
        setTimeout(() => {
            bot.telegram.sendMessage(chatId, 'Чи подобається Вам трек?', Extra.markup(Markup.inlineKeyboard(buttons)));
        },         1000);
    }

    public static writeList(chatId: number, musicResults: Array<any>): void {
        const buttons: Array<InlineKeyboardButton> = [];
        let text = '';
        musicResults.sort(((a, b) => a.addedAt < b.addedAt ? 1 : -1)).forEach((music, index) => {
            text += `${index + 1} - ${music.title}\n`;
            buttons.push(Markup.callbackButton(`${index + 1}`, `show-song.${music._id}`));
        });
        const newButtons: Array<any> = [];
        for (let i = 0; i < buttons.length; i += 5) {
            newButtons.push(buttons.slice(i, i + 5));
        }

        bot.telegram.sendMessage(chatId, text, Extra.markup(Markup.inlineKeyboard(newButtons)));
    }

    public static writeCategories(chatId: number, categories: Array<any>): void {
        const buttons: Array<InlineKeyboardButton> = categories.map((category: any) => {
            return Markup.callbackButton(`${category.title}`, `category.${category._id}`);
        });

        bot.telegram.sendMessage(chatId, 'Оберіть категорію треків', Extra.markup(Markup.inlineKeyboard(buttons)));
    }
}
