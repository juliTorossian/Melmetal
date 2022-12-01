const express = require('express');
const router = express.Router();

const controller = require('../controller/user')

router.get('/getToken', controller.getToken);

module.exports = router;