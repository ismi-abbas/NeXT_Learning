const express = require('express');
const router = express.Router();
const logger = require('../../logger/index');
const _ = require('lodash');
const axios = require('axios');
const fs = require('fs');

router.get('/', (req, res) => {
	logger.info('GET /api/getRandomJson');
	axios
		.get('https://randomuser.me/api/')
		.then((response) => {
			res.status(200);
			let data = JSON.stringify(response.data);
			fs.writeFile('./routes/api/user.json', data + '\r\n', (err, data) => {
				if (err) logger.error(err);
				else logger.info('File saved');
			});
			res.send(response.data);
		})
		.catch((error) => {
			logger.error(error);
			res.status(500).send(error);
		});
	logger.info('File write complete');
});

// @route   GET api/readData
// @desc    Reads the json file
// @access  Public

router.get('/readData', (req, res) => {
	fs.readFile('./routes/api/user.json', (err, data) => {
		if (err) logger.error(err);
		else {
			logger.info('File read complete');
			res.status(200);
			let newData = JSON.parse(data);
			res.send(newData);
		}
	});
});

module.exports = router;
