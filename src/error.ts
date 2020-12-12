import {Messages} from './messages';

module.exports.sqlError = (chatId: any) => {
    Messages.writeText(chatId, 'Ох дідько... У нас щось зламалось... Ми покликали фіксіків. А поки можете відправити нам фідбек про помилку');
};
