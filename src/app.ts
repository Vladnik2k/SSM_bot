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
bot.on('audio', commands.uploadMusic);
bot.command('added', commands.seeAdded);
bot.action(/show-song.[0-9]+/, commands.seeSong);

bot.launch();
