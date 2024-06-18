const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookSchema = new schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genreId: {
        type: schema.Types.ObjectId,
        required: true
    },
    genreCode: {
        type: String,
        required: true
    },
    genreName: {
        type: String,
        required: true
    },
    typeId: {
        type: schema.Types.ObjectId,
        required: true
    },
    typeCode: {
        type: String,
        required: true
    },
    typeName: {
        type: String,
        required: true
    },
});


const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
