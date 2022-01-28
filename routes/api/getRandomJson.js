const express = require('express');
const router = express.Router();
const logger = require('../../logger/index');
const axios = require('axios');

router.get('/', (req, res) => {
	logger.info('GET /api/getRandomJson');
	axios
		.get('https://randomuser.me/api/')
		.then((response) => {
			res.status(200);
			res.json(response.data);
		})
		.catch((error) => {
			logger.error(error);
			res.status(500).send(error);
		});

	logger.info('Hello world api hitted!');
});

router.post('/something', (req, res) => {
	res.send('You can post to this endpoint');
	logger.info('Post api hitted!');
});

module.exports = router;
