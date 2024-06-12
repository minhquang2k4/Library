const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../controller/auth');
const homeController = require('../controller/home');

router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/api/home')
  .get(homeController.index)
  .post(homeController.create);

router.delete('/api/home/:id', homeController.delete);

module.exports = router;
