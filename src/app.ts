import {Telegraf} from 'telegraf';
const configs = require('./configs');
const mongoose = require('mongoose');
mongoose.connect(configs.mongoURI, configs.mongoData).then(() => console.log('Connected to MongoDB')).catch((err: any) => console.log(err));

export const bot = new Telegraf(configs.botToken);

const userService = require('./services/user');
const musicService = require('./services/music');

bot.start(userService.start);
bot.on('audio', musicService.uploadMusic);
bot.command('added', musicService.seeAdded);
bot.on('text', musicService.searchMusic);
bot.action(/show-song.[0-9]+/, musicService.seeSong);

bot.launch();
