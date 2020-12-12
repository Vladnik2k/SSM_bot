const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    addedAt: {
        type: Date,
        required: true
    },
    addedBy: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
    fileUniqueId: {
        type: String,
        required: true
    }
});

export {};
module.exports = mongoose.model('music', musicSchema);
