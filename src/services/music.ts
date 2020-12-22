import {TelegrafContext} from 'telegraf/typings/context';
import {Messages} from '../messages';

const MUSIC = require('../models/music');
const USER = require('../models/user');
const SQL_ERROR = require('../error');

module.exports.uploadMusic = async (telegrafContext: TelegrafContext) => {
    const chatId = <number>telegrafContext.chat?.id;
    try {
        // @ts-ignore
        const fileUniqueId = telegrafContext.message.audio.file_unique_id;

        const musicFound = await MUSIC.find({ fileUniqueId: fileUniqueId });

        if (musicFound.length) {
            return;
        } else {
            const user = (await USER.find({ chatId: chatId }))[0];
            const audio = telegrafContext.update?.message?.audio;
            const music = new MUSIC({
                title: audio?.title,
                duration: audio?.duration,
                addedBy: user._id,
                addedAt: Date.now(),
                fileId: audio?.file_id,
                fileUniqueId: fileUniqueId
            });

            await music.save();
        }
    } catch (e) {
        SQL_ERROR.sqlError(chatId);
    }
};

module.exports.searchMusic = async (telegrafContext: TelegrafContext) => {
    const chatId = <number>telegrafContext.chat?.id;
    try {
        const title = <string>telegrafContext.message?.text;
        const musicFound = await MUSIC.find({ title: { $regex: title, $options : 'i' } });

        if (!musicFound.length) {
            Messages.writeText(chatId, 'На жаль, ми нічого не знайшли');
        } else {
            Messages.writeList(chatId, musicFound);
        }
    } catch (e) {
        SQL_ERROR.sqlError(chatId);
    }
};

module.exports.seeSong = async (telegrafContext: TelegrafContext) => {
    const chatId = <number>telegrafContext.chat?.id;
    try {
        const musicId = <string>telegrafContext.match?.input?.split('show-song.')[1];

        const music = await MUSIC.findById({ _id: musicId });
        Messages.writeAudio(chatId, music.fileId, music._id);
    } catch (e) {
        SQL_ERROR.sqlError(chatId);
    }
};

module.exports.seeAdded = async (telegrafContext: TelegrafContext) => {
    const chatId = <number>telegrafContext.chat?.id;
    try {
        const user = (await USER.find({ chatId: chatId }))[0];
        const musicFound = await MUSIC.find({ addedBy: user._id });

        if (!musicFound.length) {
            Messages.writeText(chatId, 'Ви ще не додали треків😢');
        } else {
            Messages.writeList(chatId, musicFound);
        }
    } catch (e) {
        SQL_ERROR.sqlError(chatId);
    }
};
