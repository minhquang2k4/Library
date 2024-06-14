// const mongoose = require('mongoose');
// const schema = mongoose.Schema;

// const borrowSchema = new schema({
//     userId: {
//         type: schema.Types.ObjectId,
//         required: true
//     },
//     books: {
//         type: [{
//             type: schema.Types.ObjectId,
//             start: Date,
//             end: Date,
//         }]
//     }
// })

// const Borrow = mongoose.model('Borrow', borrowSchema);
// module.exports = Borrow;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    start: {
        type: Date,
        default: Date.now,
        required: true
    },
    end: {
        type: Date,
        default: null
    }
});

const borrowSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    books: [bookSchema]
});

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = Borrow;