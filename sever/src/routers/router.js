const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../controller/auth');
const homeController = require('../controller/home');

router.post('/register', auth.register);
router.post('/login', auth.login);

router.delete('/api/home/:id', homeController.delete);
router.put('/api/home/:id', homeController.update);


router.route('/api/home')
  .get(homeController.index)
  .post(homeController.create);


module.exports = router;
