const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create')
const schema = mongoose.Schema;

const movieSchema = new schema({
    id: schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    category: String,
    imdb: Number
});
movieSchema.plugin(findOrCreate);

module.exports = mongoose.model('movie', movieSchema);