import { Telegraf } from 'telegraf';
import { botToken } from './constants';

const bot = new Telegraf(botToken);

bot.start((ctx) => {
    console.log(ctx.from);
    ctx.reply('Welcome');
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('')); // bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
bot.hears('hi', (ctx) => ctx.reply('Hey there')); // bot.hears это обработчик конкретного текста, данном случае это - "hi"

bot.launch(); // запуск бота
