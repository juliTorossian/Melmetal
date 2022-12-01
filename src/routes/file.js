const express = require('express');
const router = express.Router();
const multer    = require("multer");

// const upload = multer({ dest: './src/public/temp'});
const upload = multer({ storage: multer.memoryStorage() });

module.exports = router;

const controller = require('../controller/file')

router.post('/toBase', upload.single('file'), controller.fileToBase);
router.post('/toFile', controller.baseToFile);


module.exports = router;