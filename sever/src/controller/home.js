const bookModel = require('../models/book');
const genreModel = require('../models/genreBook');
const TypeBook = require('../models/typeBook');
const typeModel = require('../models/typeBook');

module.exports.index = async (req, res) => {
    const books = await bookModel.find();
    res.json(books);
}

module.exports.create = async (req, res) => {
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

    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const description = req.body.description;
    const genre = req.body.genre;
    const type = req.body.type;

    const book = new bookModel({
        title: title,
        author: author,
        image: image,
        description: description,
        genre: genre,
        type: type,
    });

    const saveBook = await book.save();
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
    res.status(201).json({ message: "Book created successfully" });
}

// module.exports.delete = async (req, res) => {
//     try {
//         const bookId = req.params.id;
//         const book = await bookModel.findById(bookId);
//         if (!book) {
//             res.status(404).json({ message: "Book not found" });
//             return;
//         }
//         if (book.type === 'cũ') {
//             await typeModel.updateOne({}, { $pull: { oldType: bookId } });
//         } else {
//             await typeModel.updateOne({}, { $pull: { newType: bookId } });
//         }
//         switch (book.genre) {
//             case 'văn học':
//                 await genreModel.updateOne({}, { $pull: { vanHoc: bookId } });
//                 break;
//             case 'khoa học':
//                 await genreModel.updateOne({}, { $pull: { khoaHoc: bookId } });
//                 break;
//             case 'truyện tranh':
//                 await genreModel.updateOne({}, { $pull: { truyenTranh: bookId } });
//                 break;
//             case 'toán học':
//                 await genreModel.updateOne({}, { $pull: { toanHoc: bookId } });
//                 break;
//             default:
//                 break;
//         }
//         await book.remove();
//         res.status(200).json({ message: "Book deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error });
//     }
// }

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

        const result = await book.remove();

        if (result) {
            res.status(200).json({ message: "Book deleted successfully" });
        } else {
            res.status(500).json({ message: "Failed to delete book" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
