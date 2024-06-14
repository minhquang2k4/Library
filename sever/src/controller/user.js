const userModel = require('../models/user');
const bookModel = require('../models/book');
const genreModel = require('../models/genreBook');
const typeModel = require('../models/typeBook');
const borrowModel = require('../models/borrow');

module.exports.getBooks = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const account = await userModel.findOne({ token: token });
        const type = await typeModel.find();
        const genre = await genreModel.find();
        const typeBook = req.query.type;
        const genreBook = req.query.genre;

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const borrow = await borrowModel.findOne({ userId: account._id });
        if (!borrow || borrow.books.length === 0 || borrow.books.every(book => book.end !== null)) {
            return res.status(200).json({ books: [] });
        }

        const listbook = borrow.books.filter(book => book.end === null).map(book => book.bookId);

        const books = await bookModel.find({ _id: { $in: listbook } });

        if (typeBook === 'none' && genreBook === 'none') {
            return res.status(200).json({ books });
        }
        if (typeBook !== 'none' && genreBook === 'none') {
            const listId = type[0][typeBook];
            const booksFilter = books.filter(book => listId.includes(book._id.toString()));
            return res.status(200).json({ books: booksFilter });
        }
        if (typeBook === 'none' && genreBook !== 'none') {
            const listId = genre[0][genreBook];
            const booksFilter = books.filter(book => listId.includes(book._id.toString()));
            return res.status(200).json({ books: booksFilter });
        }
        if (typeBook !== 'none' && genreBook !== 'none') {
            const listIdType = type[0][typeBook];
            const listIdGenre = genre[0][genreBook];
            const booksFilter = books.filter(book => listIdType.includes(book._id.toString()) && listIdGenre.includes(book._id.toString()));
            return res.status(200).json({ books: booksFilter });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module, exports.returnBook = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const bookId = req.body.bookId;
        const account = await userModel.findOne({ token: token });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const borrow = await borrowModel.findOne({ userId: account._id });

        borrow.books = borrow.books.map(book => {
            if (book.bookId.toString() === bookId) {
                book.end = new Date();
            }
            return book;
        });
        borrow.save();
        res.status(200).json({ message: 'Return book successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

