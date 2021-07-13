const express = require('express');
const router = express.Router();

// controllers
const BibliaOnlineController = require('../controllers/BibliaOnlineController');


router.get('/', BibliaOnlineController.index);
router.get('/books', BibliaOnlineController.getBooks);

module.exports = router;