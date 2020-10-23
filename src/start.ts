import {connection} from './app';

export const start = (message: any) => {
    const query = connection.query('SELECT * FROM user');
    query.on('result', function(fields: any) {
        message.reply(fields);
        setTimeout(() => message.replyWithDice(), 1000);
    });
};
