const express = require('express');
const path = require('path');
const logger = require('../../logger/index');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

router.get('/', auth, (req, res) => {
	if (err) logger.error(err);
	res.send('Login success');
});

router.post('/', (req, res) => {
	// Mock user
	const user = {
		id: 1,
		username: 'abbas',
		email: 'muhdabbas98@gmail.com',
	};
	jwt.sign({ user }, 'secretkey', (err, token) => {
		if (err) {
			logger.error(err);
		}
		res.json({ token });
	});
});

// Verify Token
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if (typeof bearer != undefined) {
	} else {
		// Forbidden
		res.sendStatus(403);
		logger.error(err);
	}
}

module.exports = router;
