const userModel = require('../models/user');
const bookModel = require('../models/book');
const genreModel = require('../models/genreBook');
const typeModel = require('../models/typeBook');
const borrowModel = require('../models/borrow');

module.exports.index = async (req, res) => {
    try {
        const start = req.query.start === 'none' ? null : new Date(req.query.start);
        const end = req.query.end === 'none' ? null : new Date(req.query.end);
        if (end) {
            end.setDate(end.getDate() + 1);
        }

        const account = await borrowModel.find();

        const bookIds = account.flatMap(borrow =>
            borrow.books
                .filter(book =>
                    (!start || new Date(book.start) >= start) &&
                    (!end || new Date(book.start) <= end)
                )
                .map(book => book.bookId)
        );

        const bookIdCounts = bookIds.reduce((acc, bookId) => {
            acc[bookId] = (acc[bookId] || 0) + 1;
            return acc;
        }, {});

        const uniqueBookIds = Object.keys(bookIdCounts);
        const books = await bookModel.find({ _id: { $in: uniqueBookIds } });
        const bookDetails = books.map(book => ({
            name: book.title,
            author: book.author,
            typeBook: book.type,
            genreBook: book.genre,
            number: bookIdCounts[book._id]
        }));

        return res.json(bookDetails);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
