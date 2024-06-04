const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../controller/auth');

router.get('/', (req, res) => {
    res.send("hello world");
})

router.get('/api/check-login', auth.checkLogin);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;cd