const express = require('express');
const router = express.Router();
const multer    = require("multer");

// const upload = multer({ dest: './src/public/temp'});
const upload = multer({ storage: multer.memoryStorage() });

const controller = require('../controller/image')

router.post('/', upload.single('imagen'), controller.cambiarFormato);


module.exports = router;