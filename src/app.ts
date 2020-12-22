import {Telegraf} from 'telegraf';
const configs = require('./configs');
const mongoose = require('mongoose');
mongoose.connect(configs.mongoURI, configs.mongoData).then(() => console.log('Connected to MongoDB')).catch((err: any) => console.log(err));

export const bot = new Telegraf(configs.botToken);

const userService = require('./services/user');
const musicService = require('./services/music');
const categoryService = require('./services/category');

bot.start(userService.start);
bot.on('audio', musicService.uploadMusic);
bot.command('added', musicService.seeAdded);
bot.command('category', categoryService.seeCategory);
bot.action(/show-song.[0-9]+/, musicService.seeSong);
bot.action(/like.([a-z]|[0-9])+/, categoryService.likeMusic);
bot.action(/dislike.([a-z]|[0-9])+/, categoryService.dislikeMusic);
bot.action(/category.([a-z]|[0-9])+/, categoryService.getByCategory);
bot.on('text', musicService.searchMusic);

bot.launch();
