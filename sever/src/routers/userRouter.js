const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/books', userController.getBooks);

router.post('/return', userController.returnBook);



module.exports = router;