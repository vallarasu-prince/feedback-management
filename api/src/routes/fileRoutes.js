const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/fileUploadController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/file/upload', uploadMiddleware.single('file'), uploadFile);

module.exports = router;
