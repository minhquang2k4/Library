const express = require('express');
const router = express.Router();
const managerController = require('../controller/manager.js');

router.post('/type', managerController.createType);

router.post('/genre', managerController.createGenre);

module.exports = router;