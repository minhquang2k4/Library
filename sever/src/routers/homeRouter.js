const express = require('express');
const router = express.Router();
const homeController = require('../controller/home');

router.delete('/:id', homeController.delete);
router.put('/:id', homeController.update);

router.post('/many', homeController.createMany);

router.post('/borrow', homeController.borrow);

router.route('/')
  .get(homeController.index)
  .post(homeController.create);

module.exports = router;