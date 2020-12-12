const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    chatId: {
        type: String,
        required: true
    }
});

export {};
module.exports = mongoose.model('users', userSchema);
