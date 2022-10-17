const express = require('express');
const router = express.Router();

const controller = require('../controller/dummy')

router.get('/', controller.dummy);


module.exports = router;