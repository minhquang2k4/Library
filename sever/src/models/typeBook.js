const mongoose = require("mongoose");
const schema = mongoose.Schema;

const typeBookSchema = new schema({
    typeCode: {
        type: String,
        required: true
    },
    typeName: {
        type: String,
        required: true
    }
});

const TypeBook = mongoose.model("TypeBook", typeBookSchema);
module.exports = TypeBook;