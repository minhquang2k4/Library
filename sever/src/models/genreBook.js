const mongoose = require("mongoose");
const schema = mongoose.Schema;

const genreSchema = new schema({
    khoaHoc: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "book"
        }]
    }, 
    toanHoc: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "book"
        }]
    },
    vanHoc: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "book"
        }]
    },
    truyenTranh: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "book"
        }]
    },
});

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;