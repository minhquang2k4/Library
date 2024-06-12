const mongoose = require("mongoose");
const schema = mongoose.Schema;

const genreSchema = new schema({
    khoaHoc: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "Type"
        }]
    }, 
    toanHoc: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "Type"
        }]
    },
    vanHoc: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "Type"
        }]
    },
    truyenTranh: {
        type: [{
            type: schema.Types.ObjectId,
            ref: "Type"
        }]
    },
});

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;