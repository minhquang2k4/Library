const userModel = require('../models/user');
const bookModel = require('../models/book');
const genreModel = require('../models/genreBook');
const typeModel = require('../models/typeBook');
const borrowModel = require('../models/borrow');

module.exports.index = async (req, res) => {
    try {
        const filterType = req.query.type;
        const filterGenre = req.query.genre;

        if (filterType === 'none' && filterGenre === 'none') {
            const books = await bookModel.find();
            return res.json(books);
        }

        const type = await typeModel.find();
        const genre = await genreModel.find();

        if (filterType === 'none' && filterGenre !== 'none') {
            const books = await bookModel.find({ _id: { $in: genre[0][filterGenre] } });
            return res.json(books);
        }
        if (filterType !== 'none' && filterGenre === 'none') {
            const books = await bookModel.find({ _id: { $in: type[0][filterType] } });
            return res.json(books);
        }
        if (filterType !== 'none' && filterGenre !== 'none') {
            const filterID = type[0][filterType].filter(value => genre[0][filterGenre].includes(value));
            const books = await bookModel.find({ _id: { $in: filterID } });
            return res.json(books);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.create = async (req, res) => {
    try {
        const title = req.body.title;
        const author = req.body.author;
        const image = req.body.image;
        const description = req.body.description;
        const genre = req.body.genreName;
        const type = req.body.typeName;

        const typeBook = await typeModel.findOne({ typeName: type });
        const genreBook = await genreModel.findOne({ genreName: genre });

        const book = new bookModel({
            title: title,
            author: author,
            image: image,
            description: description,
            genreId: genreBook._id,
            genreCode: genreBook.genreCode,
            genreName: genreBook.genreName,
            typeId: typeBook._id,
            typeCode: typeBook.typeCode,
            typeName: typeBook.typeName,
        });
        const saveBook = await book.save();
        res.json({message: "Create success"})

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports.delete = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.type === 'cũ') {
            await typeModel.updateOne({}, { $pull: { oldType: bookId } });
        } else {
            await typeModel.updateOne({}, { $pull: { newType: bookId } });
        }

        switch (book.genre) {
            case 'văn học':
                await genreModel.updateOne({}, { $pull: { vanHoc: bookId } });
                break;
            case 'khoa học':
                await genreModel.updateOne({}, { $pull: { khoaHoc: bookId } });
                break;
            case 'truyện tranh':
                await genreModel.updateOne({}, { $pull: { truyenTranh: bookId } });
                break;
            case 'toán học':
                await genreModel.updateOne({}, { $pull: { toanHoc: bookId } });
                break;
            default:
                break;
        }
        await bookModel.deleteOne({ _id: bookId });
        res.json({ message: "Delete success" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const author = req.body.author;
        const image = req.body.image;
        const description = req.body.description;
        const genre = req.body.genre;
        const type = req.body.type;

        const book = await bookModel.findOne({ _id: id });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.genre !== genre) {
            switch (book.genre) {
                case 'văn học':
                    await genreModel.updateOne({}, { $pull: { vanHoc: id } });
                    break;
                case 'khoa học':
                    await genreModel.updateOne({}, { $pull: { khoaHoc: id } });
                    break;
                case 'truyện tranh':
                    await genreModel.updateOne({}, { $pull: { truyenTranh: id } });
                    break;
                case 'toán học':
                    await genreModel.updateOne({}, { $pull: { toanHoc: id } });
                    break;
                default:
                    break;
            }
            switch (genre) {
                case 'văn học':
                    await genreModel.updateOne({}, { $push: { vanHoc: id } });
                    break;
                case 'khoa học':
                    await genreModel.updateOne({}, { $push: { khoaHoc: id } });
                    break;
                case 'truyện tranh':
                    await genreModel.updateOne({}, { $push: { truyenTranh: id } });
                    break;
                case 'toán học':
                    await genreModel.updateOne({}, { $push: { toanHoc: id } });
                    break;
                default:
                    break;
            }
        }

        if (book.type !== type) {
            if (type === 'cũ') {
                await typeModel.updateOne({}, { $pull: { newType: id } });
                await typeModel.updateOne({}, { $push: { oldType: id } });
            } else {
                await typeModel.updateOne({}, { $pull: { oldType: id } });
                await typeModel.updateOne({}, { $push: { newType: id } });
            }
        }
        book.title = title;
        book.author = author;
        book.image = image;
        book.description = description;
        book.genre = genre;
        book.type = type;
        book.save();
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.createMany = async (req, res) => {
    try {
        if (await typeModel.find().count() === 0) {
            const type = new typeModel({
                cu: [],
                moi: []
            });
            await type.save();
        }

        if (await genreModel.find().count() === 0) {
            const genre = new genreModel({
                vanHoc: [],
                khoaHoc: [],
                truyenTranh: [],
                toanHoc: []
            });
            await genre.save();
        }
        books = req.body;

        books.forEach(async book => {
            const type = book.type;
            const genre = book.genre;
            const addBook = new bookModel({
                title: book.title,
                author: book.author,
                image: book.image.toString(),
                description: book.description,
                genre: genre,
                type: type,
            });
            const saveBook = await addBook.save();
            const bookId = saveBook._id;

            if (type === 'cũ') {
                await typeModel.updateOne({}, { $push: { oldType: bookId } });
            } else {
                await typeModel.updateOne({}, { $push: { newType: bookId } });
            }

            switch (genre) {
                case 'văn học':
                    await genreModel.updateOne({}, { $push: { vanHoc: bookId } });
                    break;
                case 'khoa học':
                    await genreModel.updateOne({}, { $push: { khoaHoc: bookId } });
                    break;
                case 'truyện tranh':
                    await genreModel.updateOne({}, { $push: { truyenTranh: bookId } });
                    break;
                case 'toán học':
                    await genreModel.updateOne({}, { $push: { toanHoc: bookId } });
                    break;
                default:
                    break;
            }
        });
    }
    catch (error) {
        console.error('Error in creating many books:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ success: true });
}

module.exports.borrow = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const bookId = req.body.bookId;

        const account = await userModel.findOne({ token: token });

        if (!account) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = account._id;

        let user = await borrowModel.findOne({ userId: userId });
        if (!user) {
            user = new borrowModel({
                userId: userId,
                books: [{ bookId: bookId }]
            });
        } else {
            const bookAlreadyBorrowed = user.books.some(book => book.bookId.equals(bookId) && book.end === null);
            if (bookAlreadyBorrowed) {
                return res.status(400).json({ message: 'Book already borrowed' });
            } else {
                user.books.push({ bookId: bookId });
            }
        }

        await user.save();
        return res.json(user);
    } catch (error) {
        console.error('Error in borrowing book:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getType = async (req, res) => {
    try {
        const type = await typeModel.find();
        res.json(type);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.getGenre = async (req, res) => {
    try {
        const genre = await genreModel.find();
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}