import {TelegrafContext} from 'telegraf/typings/context';
import {Messages} from '../messages';

const MUSIC = require('../models/music');
const USER = require('../models/user');

module.exports.uploadMusic = async (telegrafContext: TelegrafContext) => {
    try {
        const chatId = <number>telegrafContext.chat?.id;
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
        console.log(e);
    }
};

module.exports.searchMusic = async (telegrafContext: TelegrafContext) => {
    try {
        const chatId = <number>telegrafContext.chat?.id;
        const title = <string>telegrafContext.message?.text;
        const musicFound = await MUSIC.find({ title: { $regex: title, $options : 'i' } });

        if (!musicFound.length) {
            Messages.writeText(chatId, 'На жаль, ми нічого не знайшли');
        } else {
            Messages.writeAdded(chatId, musicFound);
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports.seeSong = async (telegrafContext: TelegrafContext) => {
    try {
        const musicId = <string>telegrafContext.match?.input?.split('show-song.')[1];
        const chatId = <number>telegrafContext.chat?.id;

        const music = await MUSIC.findById({ _id: musicId });
        Messages.writeAudio(chatId, music.fileId);
    } catch (e) {
        console.log(e);
    }
};

module.exports.seeAdded = async (telegrafContext: TelegrafContext) => {
    try {
        const chatId = <number>telegrafContext.chat?.id;
        const user = (await USER.find({ chatId: chatId }))[0];
        const musicFound = await MUSIC.find({ addedBy: user._id });

        if (!musicFound.length) {
            Messages.writeText(chatId, 'Ви ще не додали треків😢');
        } else {
            Messages.writeAdded(chatId, musicFound);
        }
    } catch (e) {
        console.log(e);
    }
};
