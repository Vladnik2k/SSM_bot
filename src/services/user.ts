import {TelegrafContext} from 'telegraf/typings/context';
import {Messages} from '../messages';

const USER = require('../models/user');

module.exports.start = async (telegrafContext: TelegrafContext) => {
    const chatId = <number>telegrafContext.chat?.id;

    const foundUsers = await USER.find({ chatId: chatId });

    if (foundUsers.length) {
        Messages.writeText(chatId, 'І знову привіт!)');
    } else {
        const user = new USER({ chatId: chatId });
        await user.save();
        Messages.writeText(chatId, 'Здається, ти тут вперше)');
    }
};
