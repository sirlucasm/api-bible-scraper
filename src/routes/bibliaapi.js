const express = require('express');
const router = express.Router();

// controllers
const BibliaApiController = require('../controllers/BibliaApiController');


router.get('/', BibliaApiController.index);
router.get('/bibles', BibliaApiController.getBibles);
router.get('/:bibleType/books', BibliaApiController.getBooks);
router.get('/:bibleType/:bookName/chapters', BibliaApiController.getChapters);
router.get('/:bibleType/:bookName/:chapterNumber', BibliaApiController.getVerses);

module.exports = router;