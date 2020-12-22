const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicCategoryMappingSchema = new Schema({
    categoryId: {
        type: String,
        required: true
    },
    musicId: {
        type: String,
        required: true
    }
});

export {};
module.exports = mongoose.model('musicCategoryMapping', musicCategoryMappingSchema);
