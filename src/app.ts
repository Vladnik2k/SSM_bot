// @ts-ignore
import mysql from 'mysql';
import {Telegraf} from 'telegraf';
import {botToken, mysqlConnectionData} from './constants';
import {Commands} from './commands';

export const bot = new Telegraf(botToken);
export const connection = mysql.createConnection(mysqlConnectionData);
const commands = new Commands();

connection.connect();

bot.start(commands.start);
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('')); // bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears('hi', (ctx) => ctx.reply('Hey there')); // bot.hears это обработчик конкретного текста, данном случае это - "hi"
//
bot.launch(); // запуск бота
