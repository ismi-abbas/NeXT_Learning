const express = require('express');
const logger = require('./logger');

const app = express();

app.get('/', (req, res) => {
	res.send('This is the sample response');
	logger.info('Creating log after api being hit');
});

app.get('/Hello', (req, res) => {
	res.send('This is the get request. Hello World!');
	logger.info('Creating log after api being hit');
});

app.post('/', (req, res) => {
	res.send('You can post to this endpoint');
	logger.info('Creating log after api being hit');
});

const port = 3001;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

logger.warn('warning information');
logger.error('error information');
logger.info('info information');
