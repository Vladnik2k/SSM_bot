import {TelegrafContext} from 'telegraf/typings/context';
import {Messages} from '../messages';

const MUSIC = require('../models/music');
const CATEGORIES = require('../models/categories');
const CATEGORIES_MUSIC_MAPPING = require('../models/categoryMusicMapping');
const MUSIC_USER_MAPPING = require('../models/musicUserMapping');
const USER = require('../models/user');
const SQL_ERROR = require('../error');

module.exports.likeMusic = async (telegrafContext: TelegrafContext) => {
    const chatId = <number>telegrafContext.chat?.id;
    try {
        const musicId = <string>telegrafContext.match?.input?.split('like.')[1];
        const user = (await USER.find({ chatId: chatId }))[0];
        const foundMapping = await MUSIC_USER_MAPPING.find({ userId: user._id, musicId: musicId });
        if (foundMapping.length) {
            return;
        }

        const mapping = new MUSIC_USER_MAPPING({
            userId: user._id,
            musicId: musicId
        });

        mapping.save();
    } catch (e) {
        SQL_ERROR.sqlError(chatId);
    }
};

module.exports.dislikeMusic = async (telegrafContext: TelegrafContext) => {
    const chatId = <number>telegrafContext.chat?.id;
    try {
        const musicId = <string>telegrafContext.match?.input?.split('dislike.')[1];
        const user = (await USER.find({ chatId: chatId }))[0];

        await MUSIC_USER_MAPPING.findOneAndDelete({ userId: user._id, musicId: musicId });
    } catch (e) {
        SQL_ERROR.sqlError(chatId);
    }
};

module.exports.seeCategory = async (telegrafContext: TelegrafContext) => {
    const chatId = <number>telegrafContext.chat?.id;
    try {
        const categories = await CATEGORIES.find();
        Messages.writeCategories(chatId, categories);
    } catch (e) {
        SQL_ERROR.sqlError(chatId);
    }
};

module.exports.getByCategory = async (telegrafContext: TelegrafContext) => {
    console.log('asd');
    const chatId = <number>telegrafContext.chat?.id;
    try {
        const categoryId = <string>telegrafContext.match?.input?.split('category.')[1];
        const musicIds = (await CATEGORIES_MUSIC_MAPPING.find({ categoryId: categoryId })).map((mapping: any) => mapping.musicId);
        const musicFound = await MUSIC.find({ _id: musicIds });
        Messages.writeList(chatId, musicFound);
    } catch (e) {
        SQL_ERROR.sqlError(chatId);
    }
};
