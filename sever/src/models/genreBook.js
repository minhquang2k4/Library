const mongoose = require("mongoose");
const schema = mongoose.Schema;

const genreSchema = new schema({
    genreCode: {
        type: String,
        required: true
    },
    genreName: {
        type: String,
        required: true
    }
});

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;