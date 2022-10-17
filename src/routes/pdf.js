const express = require('express');
const router = express.Router();

const controller = require('../controller/pdf')

router.get('/pdfTest', controller.pdfTest);


module.exports = router;