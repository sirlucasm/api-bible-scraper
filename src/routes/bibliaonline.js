const express = require('express');
const router = express.Router();

router.get('/create',
	(req, res) => {
		res.send('teste');
	}
);

module.exports = router;