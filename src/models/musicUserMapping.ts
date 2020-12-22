const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicUserMappingSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    musicId: {
        type: String,
        required: true
    }
});

export {};
module.exports = mongoose.model('musicUserMapping', musicUserMappingSchema);
