const express = require('express');
const router = express.Router();
const auth = require('../controller/auth');
const homeController = require('../controller/home');
const statisticsController = require('../controller/statistics.js');

router.post('/register', auth.register);
router.post('/login', auth.login);

router.use('/api/home', require('./homeRouter.js'));

router.use('/api/user', require('./userRouter.js'));

router.get('/api/statistics', statisticsController.index);

module.exports = router;