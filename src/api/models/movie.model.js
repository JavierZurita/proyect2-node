const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        title: {type: String, required: true},
        director: {type: String, required: true},
        year: {type: Number, required: true},
        genre: {type: String, required: true}
       // image: {type: String, require: true, default: }
    },{
        timestamps: true
    }
)

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;