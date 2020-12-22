import {TelegrafContext} from 'telegraf/typings/context';
import {Messages} from '../messages';

const MUSIC = require('../models/music');
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
