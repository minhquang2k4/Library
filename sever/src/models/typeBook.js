const mongoose = require("mongoose");
const schema = mongoose.Schema;

const typeBookSchema = new schema({
    newType: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "book"
        }]
    },
    oldType: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "book"
        }]
    }
});

const TypeBook = mongoose.model("TypeBook", typeBookSchema);
module.exports = TypeBook;