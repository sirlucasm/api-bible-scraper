const express = require('express');
const router = express.Router();

// controllers
const BibliaOnlineController = require('../controllers/BibliaOnlineController');


router.get('/', BibliaOnlineController.index);
router.get('/:bibleType/books/all', BibliaOnlineController.getAllBooks);
router.get('/:bibleType/books', BibliaOnlineController.getBooks);
router.get('/:bibleType/:bookName/chapters', BibliaOnlineController.getChapters);
router.get('/:bibleType/:bookName/:chapterNumber', BibliaOnlineController.getVerses);

module.exports = router;