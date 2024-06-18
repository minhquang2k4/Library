const typeBook = require('../models/typeBook');
const genreBook = require('../models/genreBook');

module.exports.createType = async (req, res) => {
    try {
        const code = req.body.typeCode;
        const name = req.body.typeName;
        const type = new typeBook({
            typeCode: code,
            typeName: name
        });
        await type.save();
        res.json({ message: 'Create type success' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.createGenre = async (req, res) => {
    try {
        const code = req.body.genreCode;
        const name = req.body.genreName;
        const genre = new genreBook({
            genreCode: code,
            genreName: name
        });
        await genre.save();
        res.json({ message: 'Create genre success' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}